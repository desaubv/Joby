const { Router } = require('express');
const router = Router();

function Documents(io){
    const controller = require('../controllers/conversation.controller')(io);
    
    
    router.route('/')
        .post( controller.createConversation )
    
    router.route('/user/:id')
        .get(controller.getConversations)
    
    router.route('/chat/:conversationId/:userId')
        .get(controller.getConversationAndMessages)


    return router;
}

module.exports = Documents;