const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const OportunityModel = require('../models/oportunity.model');

const OportunitiesHandler = new MongooseHandler(OportunityModel);
const controller = {};

const oportunityController = (io) => {

    controller.create = async( req, res ) => {
        const { success, body } = HTTPHandler.getBody(req, [ "authorId", "enterpriseId", "title", "description", "type", "hours", "typeOfWorkday" ])

        if( success ){

            OportunitiesHandler.create(body)
                .then( data => HTTPHandler.okResponse(res, data) )
                .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );

        }else{
            HTTPHandler.clientError(res, {
                message: "Parametros incompletos",
                requiredParams: body,
                type: HTTPHandler.TYPE.UNCOMPLETE_PARAMS
            });
        }
    }


    return controller;
}

module.exports = oportunityController;