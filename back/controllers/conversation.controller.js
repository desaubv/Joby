const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const ConversationModel = require('../models/conversation.model');
const UsersModel = require('../models/users.model');
const MessageModel = require('../models/message.model');

const ConversationHandler = new MongooseHandler(ConversationModel);
const UsersHandler = new MongooseHandler(UsersModel);
const MessagesHandler = new MongooseHandler(MessageModel);

const controller = {};

const oportunityController = (io) => {

    controller.getConversations = async(req, res) => {
        const { id } = req.params;

        ConversationHandler.find({$or: [
            { userId1: id },
            { userId2: id }
        ]}, { updatedAt: -1 }).then((conversations) => {

            const returnData = conversations.map(async(c) => {
                const datita = {};

                if(c.userId1 !== id){
                    const user = await UsersModel.findById(c.userId1);
                    const lastMessage = await MessageModel.findOne({conversationId: c._id, conversationIndex: c.conversationIndex});

                    datita._id = c._id;
                    datita.pic = user.pic;
                    datita.name = user.name;
                    datita.lastname = user.lastname;
                    datita.lastMessage = lastMessage.message;
                    datita.time = lastMessage.time;
                    datita.date = lastMessage.date;
                    

                }else{
                    const user = await UsersModel.findById(c.userId2);
                    const lastMessage = await MessageModel.findOne({conversationId: c._id, conversationIndex: c.conversationIndex});


                    datita._id = c._id;
                    datita.pic = user.pic;
                    datita.name = user.name;
                    datita.lastname = user.lastname;
                    datita.lastMessage = lastMessage !== null ? lastMessage.message : '';
                    datita.time = lastMessage !== null ? lastMessage.time : '';
                    datita.date = lastMessage !== null ? lastMessage.date : '';
                    datita.readen = lastMessage !== null ? lastMessage.readen : false;
                }

                return datita;
            });

            Promise.all(returnData)
            .then(data => {
                HTTPHandler.okResponse(res, data);
            })
            .catch(err => {
                console.log(err);
                HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE })            
            });
        }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }));

    }

    controller.getConversationAndMessages = async(req, res) => {
        const { conversationId, userId } = req.params;

        
        ConversationHandler.findById(conversationId)
        .then(async(c) => {
            const otherUserID = (c.userId1 !== userId) ? c.userId1 : c.userId2;
            
            UsersHandler.findById(otherUserID)
                .then(otherUser => {
                    const other = {};
                
                    other['name'] = otherUser.name;
                    other['lastname'] = otherUser.lastname;

                    MessagesHandler.find({ conversationId: conversationId }, { conversationId: 1 })
                        .then(messages => HTTPHandler.okResponse(res, { other, messages }) )
                        .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }));

                }).catch(err =>{ HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }); console.log("VALIO VERGA", err); } );
            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }));
    }


    return controller;
}

module.exports = oportunityController;