const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const OportunityModel = require('../models/oportunity.model');
const EnterpriseModel = require('../models/enterprise.model');
const AppliesModel = require('../models/applies.model');
const UsersModel = require('../models/users.model');
const conversationModel = require('../models/conversation.model');

const OportunitiesHandler = new MongooseHandler(OportunityModel);
const EnterpriseHandler = new MongooseHandler(EnterpriseModel);
const AppliesHandler = new MongooseHandler(AppliesModel);
const UsersHandler = new MongooseHandler(UsersModel);
const controller = {};

const oportunityController = (io) => {

    controller.create = async( req, res ) => {
        const { success, body } = HTTPHandler.getBody(req, 
            [
                "authorId", "enterpriseId", "title", "description", "experience", "responsabilities", "disabilities", "type", "typeOfWorkday", "ubication"
            ]);
        const {salary} = req.body;

        if( success ){

            OportunitiesHandler.create({...body, ['salary']: salary})
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

    controller.getAll = (req, res) => {
        OportunitiesHandler.find({}, {updatedAt: -1})
            .then( data => {
                
                const oportunities =  data.map(async(d) => {
                    const enterprise = await EnterpriseModel.findById(d.enterpriseId);
                    const aux = d.toObject();
                    return {...aux, pic: enterprise.pic, name: enterprise.name}
                })

                Promise.all(oportunities)
                    .then(data => {
                        HTTPHandler.okResponse(res, data);
                    })
                    .catch(err => {
                        console.log(err);
                        HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE })            
                    });

            } )
            .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    
    }

    controller.getById = (req, res) => {
        const { id } = req.params;

        OportunitiesHandler.findById(id)
            .then( data => {
                EnterpriseHandler.findById(data.enterpriseId)
                    .then((enterprise) => HTTPHandler.okResponse(res, {oportunity: data, enterprise: enterprise}))
                    .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    

            }).catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    
    }

    controller.apply = (req, res) => {
        const { userId, oportunityId } = req.params;

        AppliesHandler.findOne({userId, oportunityId})
            .then(data => {

                if(data){
                    HTTPHandler.clientError(res, {
                        error: "No puedes aplicar dos veces a la misma vacante",
                        message: 'Ya aplicaste previamente a esta vacante'
                    });
                    return;
                }

                AppliesHandler.create({ userId, oportunityId })
                    .then((data) => HTTPHandler.okResponse(res, data))
                    .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    
            }).catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    
    }

    controller.deleteOportunity = async(req, res) => {
        const { id } = req.params;

        await conversationModel.findOneAndDelete({ oportunityId: id })

        OportunitiesHandler.findByIdAndDelete(id)
            .then( data => HTTPHandler.okResponse(res, data))
            .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    
    }

    controller.getByUserId = (req, res) => {
        const { id } = req.params;

        OportunitiesHandler.find({authorId: id})
            .then(data => {

                AppliesHandler.find({ userId: id })
                    .then(applies => {

                        const ids = applies.map(a => a.oportunityId);

                        OportunitiesHandler.find({ _id: { $in: ids } })
                            .then( opo => {
                                
                                const oportunities =  opo.map(async(d) => {
                                    const enterprise = await EnterpriseModel.findById(d.enterpriseId);
                                    const aux = d.toObject();
                                    return {...aux, pic: enterprise.pic, name: enterprise.name}
                                })

                                Promise.all(oportunities)
                                    .then(myapplies => {
                                        HTTPHandler.okResponse(res, { oportunities: data, applies: myapplies });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE })            
                                    });

                            } )
                            .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    



                    }).catch( err => {
                        HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) 
                        console.log(err);

                    });    
                
            }).catch( err => {
                HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) 
                console.log(err);

            }); 
    }

    controller.getApplies =  (req, res) => {
        const { id } = req.params;

        AppliesHandler.find({ oportunityId: id })
            .then(data => {
                const ids = data.map(d => d.userId);

                UsersHandler.find({ _id: { $in: ids } })
                    .then( users => HTTPHandler.okResponse(res, users))
                    .catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    

            }).catch( err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE }) );    

    }

    return controller;
}

module.exports = oportunityController;