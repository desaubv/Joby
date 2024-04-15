const CloudinaryHandler = require('../classes/CloudinaryHandler');
const FilesHandler = require('../classes/FilesHandler');
const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const EnterpriseModels = require('../models/enterprise.model');
const UsersModel = require('../models/users.model');

const EnterpriseHandler = new MongooseHandler(EnterpriseModels);
const UsersHandler = new MongooseHandler(UsersModel);
const controller = {};

const oportunityController = (io) => {

    controller.create = async( req, res ) => {        
        const { success, body } = HTTPHandler.getBody(req, ['name', 'description', 'branches']);
        const { pic } = req.files;

        if( success ){

            CloudinaryHandler.uploadFile(pic.tempFilePath, 'enterprise')
                .then(url => {
                    const auxBody = {...body};
                    auxBody.branches = body.branches.split(',').map(item => item.trim());
                    
                    EnterpriseHandler.create({...auxBody, ['pic']: url})
                        .then(enterprise => {
                            HTTPHandler.okResponse(res, enterprise);
                            FilesHandler.deleteAllFilesFromArray([ pic ], 'tempFilePath');
                        })
                        .catch(err => {
                            HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos', type: HTTPHandler.TYPE.DATABASE });
                            FilesHandler.deleteAllFilesFromArray([ pic ], 'tempFilePath');
                        });
                    
                }).catch(err => {
                    HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto', type: "CLOUDINARY" });
                    FilesHandler.deleteAllFilesFromArray([ pic ], 'tempFilePath');
                });
            
        }else{
            HTTPHandler.clientError(res, {
                message: "Parametros incompletos",
                requiredParams: body,
                type: HTTPHandler.TYPE.UNCOMPLETE_PARAMS
            });
        }
    }

    controller.getAll = async(req, res) => {

        EnterpriseHandler.find()
            .then(enterprises => HTTPHandler.okResponse(res, enterprises) )
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto', type: "CLOUDINARY" }) )
    }

    controller.getById = async(req, res) => {
        const { id } = req.params;

        EnterpriseHandler.findById(id)
            .then(enterprise => HTTPHandler.okResponse(res, enterprise) )
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto', type: "CLOUDINARY" }) )
    }
    
    controller.joinEnterprise = async(req, res) => {
        const { userId } = req.params;
        const { enterpriseId } = req.body;

        if(enterpriseId == null){
            UsersHandler.findByIdAndUpdate(userId, { $unset: {enterpriseId: ''} })
            .then(user => HTTPHandler.okResponse(res, user) )
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto', type: "CLOUDINARY" }) )    
        }else{
            UsersHandler.findByIdAndUpdate(userId, { enterpriseId: enterpriseId })
            .then(user => HTTPHandler.okResponse(res, user) )
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto', type: "CLOUDINARY" }) )    
        }
    }

    return controller;
}

module.exports = oportunityController;