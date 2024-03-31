const { Router } = require('express');
const router = Router();

function Documents(io){
    const controller = require('../controllers/documents.controller')(io);
    
    router.route('/')
        .post( controller.addDocument )

    router.route('/:id')
        .get( controller.getDocument )
    
    router.route('/:id/data')
        .get( controller.getDocumentData )


    return router;
}

module.exports = Documents;