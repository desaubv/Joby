const { Router } = require('express');
const router = Router();

function Login(io) {
    const controller = require('../controllers/oportunity.controller')(io);

    router.route('/')
        .post( controller.create )
        .get( controller.getAll )
        
    router.route('/:id')
        .get( controller.getById )
        .delete( controller.deleteOportunity )
    
    router.route('/user/:id')
        .get( controller.getByUserId )
        
    router.route('/apply/:userId/:oportunityId')
        .post( controller.apply )

    router.route('/apllies/:id')
        .get( controller.getApplies )

    return router;
}

module.exports = Login;
