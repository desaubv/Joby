const HTTPHandler = require('../classes/HTTPHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const FilesHandler = require('../classes/FilesHandler');
const DocumentsModel = require('../models/documents.model');
const fs = require('fs');

const controller = {};

function Documents(io){

    controller.addDocument = async(req, res) => {
        const { document } = FilesHandler.getAllFilesFromReq(req);
        const { success, body } = HTTPHandler.getBody(req, [ 'userId', 'description' ]);

        if(document == undefined){
            HTTPHandler.clientError(res, 
                { 
                    message: 'El archivo no se envió correctamente', 
                    error: {
                        message: "El parametro 'document' no fue recibido en el servidor"
                    } 
                }); 
        }else{

            if(!success){
                HTTPHandler.clientError(res, { message: 'ID del usuario no enviado correctamente', requiredParams: body });
                return;
            }

            const docData = fs.readFileSync(document.tempFilePath);
            
            const Document = {
                title: document.name,
                type: document.mimetype,
                file: docData,
                userId: body.userId,
                description: body.description
            }

            const DocumentHandler = new MongooseHandler(DocumentsModel);
            DocumentHandler.create(Document)
                .then(data => {
                    HTTPHandler.okResponse(res, data);
                    fs.unlinkSync(document.tempFilePath);
                }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
        }
        
    }

    controller.getDocument = async(req, res) => {
        const { id } = req.params;

        const DocumentHandler = new MongooseHandler(DocumentsModel);
        DocumentHandler.findById(id)
            .then(data => {

                console.log(data);

                res.setHeader('Content-Disposition', `attachment; filename="${data.title}"`);
                res.setHeader('Content-Type', data.type);
                res.send(data.file);

            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }

    controller.getDocumentData = async(req, res) => {
        const { id } = req.params;

        const DocumentHandler = new MongooseHandler(DocumentsModel);
        DocumentHandler.findById(id)
            .then(data => {


                HTTPHandler.okResponse(res, {
                    title: data.title,
                    description: data.description,
                    type: data.type
                });

            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }

    return controller;
}

module.exports = Documents;