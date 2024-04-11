const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const usersModel = require('../models/users.model');

const UsersHandler = new MongooseHandler(usersModel);
const controller = {};

const oportunityController = (io) => {

    controller.update = async( req, res ) => {
        const { body } = req;
        const { id } = req.params;

        UsersHandler.findByIdAndUpdate(id, body)
                .then( data => HTTPHandler.okResponse(res, data) )
                .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );
    }


    return controller;
}

module.exports = oportunityController;