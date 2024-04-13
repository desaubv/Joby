const MongooseHandler = require('./MongooseHandler');
const ConversationModel = require('../models/conversation.model');
const MessageModel = require('../models/message.model');

class Sockets {

    constructor( io ){
        io.on('connect', (socket) => {

            socket.on('client:joinConversations', async(id) => {
                const conversations = await ConversationModel.find({$or: [
                    { userId1: id },
                    { userId2: id }
                ]});

                conversations.forEach(c => {
                    socket.join(c.id);
                })
            })


            socket.on('client:sendMessage', async(data) => {
                const message = {...data};
                const date = new Date();
                const conversation = await ConversationModel.findById(data.conversation);
                
                message.conversationId = data.conversation;
                message.receiver = conversation.userId1 == data.sender ? conversation.userId2 : conversation.userId1;
                message.conversationIndex = conversation.conversationIndex+1;
                message.date = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                message.time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

                await ConversationModel.findByIdAndUpdate(data.conversation, {conversationIndex: message.conversationIndex});
                const newMessage = await new MessageModel(message).save();

                io.to(data.conversation).emit("server:sendedMessage", newMessage);
            });

            socket.on('client:getMessages', async(conversationId) => {
                const messages = await MessageModel.find({conversationId: conversationId}).sort({ conversationId: 1 });

                io.to(conversationId).emit("server:showMessages", messages);
            })

        });
    }

}

module.exports = Sockets;