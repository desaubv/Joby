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
                const labels = [];

                const response = messages.map(m => {
                    const label = determinarFecha(m.date);
                    if( !labels.includes(label) ){
                        labels.push(label);
                        const tmp = m.toObject();
                        tmp.label = label;

                        return tmp;
                    }
                    return m;
                });

                io.to(conversationId).emit("server:showMessages", response);
            })

        });
    }

}

module.exports = Sockets;

function determinarFecha(fechaString) {
    const partesFecha = fechaString.split('-');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const anio = parseInt(partesFecha[2], 10);
    const fecha = new Date(anio, mes, dia);

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); 

    const diferencia = (fechaActual - fecha) / (1000 * 60 * 60 * 24);

    if (diferencia === 0) {
        return 'Hoy';
    } else if (diferencia === 1) {
        return 'Ayer';
    } else if (diferencia === 2) {
        return 'Anteayer';
    } else {
        return fechaString;
    }
}