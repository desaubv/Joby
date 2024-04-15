const { Router } = require('express');
const router = Router();

function Documents(io){
    const controller = require('../controllers/enterprise.controller')(io);
    
    router.route('/')
        .post( controller.create )
        .get( controller.getAll )

    router.route('/:id')
        .get( controller.getById ) 

    router.route('/join/:userId')
        .put( controller.joinEnterprise )

    return router;
}

module.exports = Documents;