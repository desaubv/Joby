const HTTPHandler  = require('../classes/HTTPHandler');
const FilesHandler = require('../classes/FilesHandler');
const MongooseHandler = require('../classes/MongooseHandler');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Mailer = require('../classes/Mailer');
const UsersModel = require('../models/users.model');
const PasskeysModel = require('../models/passkey.model');
const passkeyModel = require('../models/passkey.model');
const usersModel = require('../models/users.model');
const CloudinaryHandler = require('../classes/CloudinaryHandler');

const controller = {};

function Login(io){

    // Iniciar sesion
    controller.login = async(req, res) => {
        const { success, body } = HTTPHandler.getBody(req, [ 'email', 'password' ]);

        if( success ) {
            const mongooseHandler = new MongooseHandler(UsersModel);

            mongooseHandler.findOne({ email: body.email })
                .then(data => {
                    if( data != null ){

                        if( bcrypt.compareSync(body.password, data.password) ){
        
                            HTTPHandler.okResponse(res, data);
        
                        }else{
                            HTTPHandler.clientError(res, {
                                message: 'Correo o contraseña incorrectos'
                            });
                        }
        
                    }else{
                        HTTPHandler.clientError(res, {
                            message: 'Correo o contraseña incorrectos'
                        });
                        return;
                    }                
                })
                .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

        }else{
            HTTPHandler.clientError(res, {
                message: "Correo o contraseña no ingresado correctamente",
                requiredParams: body
            });
        }
            

    }

    // Crear cuenta
    controller.signIn = async(req, res) => {
        const { state, userId } = req.params;

        switch (state) {
            case '1': signinState1(req, res);
                break;
            case '2': signinState2(req, res, userId)
                break;
            case '3': signinState3(req, res, userId);
                    break;
            case '4': signinState4(req, res, userId)
                    break;
            case '5': signinState5(req, res, userId);
                        break;
            default: HTTPHandler.clientError(res, {
                        message: `Parametro 'state=${state}' no valido`
                    });
        }
    }

    // Olvide mi contraseña
    controller.forgotPassword = async(req, res) => {
        const { state } = req.params;

        switch (state) {
            case '1': state1(req, res);
                break;
            case '2': state2(req, res);
                break;
            default: HTTPHandler.clientError(res, {
                        message: `Parametro 'state=${state}' no valido`
                    });
        }
    }



    return controller;
}

module.exports = Login;

// Funciones para SIGN IN (controller.signIn) segun state
/*
    1. Crear registro con (name, lastname, email, password)
    2. Actualizar información personal (gender, disabilities) 
    3. Subir experiencia laboral (experience)
    4. Subir foto y curriculim (pic, cv)
    5. Agregar una descripción personal (description)
*/
async function signinState1(req, res){
    const { success, body } = HTTPHandler.getBody(req, [ 'email', 'name', 'lastname', 'password' ]);

    if( success ) {
        const userHandler = new MongooseHandler(UsersModel);
            
        userHandler.findOne({ email: body.email })
            .then(user => {
                if(user == null){
                    const password = bcrypt.hashSync(body.password, 5);

                    userHandler.create({
                        email: body.email,
                        name: body.name,
                        lastname: body.lastname,
                            password
                    }).then(data => HTTPHandler.okResponse(res, data))
                    .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
                }else{
                    HTTPHandler.clientError(res, { 
                            error: 'Email ya registrado', 
                        message: `El correo electronico ${body.email} ya esta registrado, prueba con otro diferente` 
                    });
                }
            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }else{
        HTTPHandler.clientError(res, {
            message: "Nombre, apellido, correo y/o contraseña no ingresado(s) correctamente",
            requiredParams: body
        });
    }
}

async function signinState2(req, res, userId){
    const { success, body } = HTTPHandler.getBody(req, [ 'gender', 'disabilities', 'ocupation' ]);

    if( success ) {
        const userHandler = new MongooseHandler(usersModel);

        userHandler.findById(userId)
            .then(data => {
                if(data != null){

                    userHandler.findByIdAndUpdate(userId,{
                        gender: body.gender,
                        disabilities: body.disabilities,
                        ocupation: body.ocupation,
                    })
                    .then(user => HTTPHandler.okResponse(res, user))
                    .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

                }else{
                    HTTPHandler.clientError(res, { error: 'ID no encontrado', message: 'No se encontró un registro con el userId indicado' });
                }
            })
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }else{
        HTTPHandler.clientError(res, {
            message: "Alguno de los valores no fue ingresado correctamente",
            requiredParams: body
        });
    }
}

async function signinState3(req, res, userId){
    const { success, body } = HTTPHandler.getBody(req, [ 'experience', 'schoolRecord' ]);

    if( success ) {
        const userHandler = new MongooseHandler(usersModel);

        userHandler.findById(userId)
            .then(data => {
                if(data != null){

                    userHandler.findByIdAndUpdate(userId,{
                        experience: body.experience,
                        schoolRecord: body.schoolRecord
                    })
                    .then(user => HTTPHandler.okResponse(res, user))
                    .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

                }else{
                    HTTPHandler.clientError(res, { error: 'ID no encontrado', message: 'No se encontró un registro con el userId indicado' });
                }
            })
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
    }else{
        HTTPHandler.clientError(res, {
            message: "Alguno de los valores no fue ingresado correctamente",
            requiredParams: body
        });
    }
}

async function signinState4(req, res, userId){
    const { success, body } = HTTPHandler.getBody(req, [ ]);

    if( success ) {
        const { pic, cv } = FilesHandler.getAllFilesFromReq(req);
        const userHandler = new MongooseHandler(UsersModel);

        const userData = {}
        if(pic != undefined) {
            if(cv != undefined) userData.cv = fs.readFileSync(cv.tempFilePath);

            CloudinaryHandler.uploadFile(pic.tempFilePath)
                .then(url => {
                    userData.pic = url;

                    userHandler.findByIdAndUpdate(userId, userData)
                    .then(user => {
                        HTTPHandler.okResponse(res, user);
                        FilesHandler.deleteAllFilesFromArray([pic, cv], 'tempFilePath');
                    })
                    .catch(err => {
                        HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' });
                        FilesHandler.deleteAllFilesFromArray([pic, cv], 'tempFilePath');
                    });
                    
                }).catch(err => {
                    HTTPHandler.serverError(res, { error: err, message: 'Error al subir la foto' });
                })
        }else{
            if(cv != undefined) userData.cv = fs.readFileSync(cv.tempFilePath);

            userHandler.findByIdAndUpdate(userId, userData)
                .then(user => {
                    HTTPHandler.okResponse(res, user);
                    FilesHandler.deleteAllFilesFromArray([pic, cv], 'tempFilePath');
                })
                .catch(err => {
                    HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' });
                    FilesHandler.deleteAllFilesFromArray([pic, cv], 'tempFilePath');
                });
        }
        

    }else{
        HTTPHandler.clientError(res, {
            message: "Alguno de los valores no fue ingresado correctamente",
            requiredParams: body
        });
    }
}

async function signinState5(req, res, userId){
    const { success, body } = HTTPHandler.getBody(req, [ 'description' ]); // Description puede ser null

    if( success ) {
        const userHandler = new MongooseHandler(usersModel);

        userHandler.findById(userId)
            .then(data => {
                if(data != null){

                    userHandler.findByIdAndUpdate(userId,{
                        description: body.description,
                    })
                    .then(user => HTTPHandler.okResponse(res, user))
                    .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

                }else{
                    HTTPHandler.clientError(res, { error: 'ID no encontrado', message: 'No se encontró un registro con el userId indicado' });
                }
            })
            .catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
    }else{
        HTTPHandler.clientError(res, {
            message: "Alguno de los valores no fue ingresado correctamente",
            requiredParams: body
        });
    }
}

// Funciones para FORGOT (controller.forgotPassword) segun state
/*
    1. Enviar correo electronico
    2. Cambiar contraseña 
*/
async function state1(req, res){
    const { success, body } = HTTPHandler.getBody(req, [ 'email' ]);

    if( success ){
        const userHandler = new MongooseHandler(UsersModel);
        const passkeysHandler = new MongooseHandler(PasskeysModel);

        userHandler.findOne({ email: body.email })
            .then(data => {

                if((data) != null){
                    const passkey = createPasskey();

                    passkeysHandler.findOneAndDelete({ userId: data.id })
                        .then(() => {
                            passkeysHandler.create({
                                userId: data.id,
                                userEmail: data.email,
                                passkey
                            })
                            .then(() => {
                                const mailer = new Mailer();
        
                                mailer.sendTemplateMail(body.email, 'Joby: Recuperar contraseña', mailer.mailForgotPass, { name: data.name, passkey }, false)
                                    .then((info) => {
                                        HTTPHandler.okResponse(res, {
                                            message: "Si el correo es correcto, se enviara un link para reiniciar la contraseña",
                                            info
                                        });
                                    }).catch((err) => {
                                        HTTPHandler.serverError(res, {
                                            message: "Ha ocurrido un error al enviar el correo",
                                            error: err
                                        });
                                    });
        
                            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
                        }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

                    

                }else{
                    HTTPHandler.okResponse(res, {
                        message: "Si el correo es correcto, se enviara un link para reiniciar la contraseña"
                    });
                }
            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }else{
        HTTPHandler.okResponse(res, {
            message: "Si el correo es correcto, se enviara un link para reiniciar la contraseña"
        });
    }
}

async function state2(req, res){
    const { success, body } = HTTPHandler.getBody(req, [ 'email', 'newPassword', 'passkey' ]);

    if( success ){
        const passkeyHandler = new MongooseHandler(passkeyModel);
        const userHandler = new MongooseHandler(usersModel);

        passkeyHandler.findOne({ userEmail: body.email, passkey: body.passkey })
            .then(passkey => {
                if(passkey == null){
                    HTTPHandler.clientError(res, {
                        message: "Passkey incorrecto o expirado"
                    });
                }else{
                    const password = bcrypt.hashSync(body.newPassword, 5);

                    userHandler.findOneAndUpdate({ email: body.email }, { password })
                        .then(user => {
                            HTTPHandler.okResponse(res, {
                                message: 'Contraseña actualizada con exito',
                                user
                            });

                            passkeyHandler.findOneAndDelete({ userId: user.id });
                        }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));
                }
            }).catch(err => HTTPHandler.serverError(res, { error: err, message: 'Error en la base de datos' }));

    }else{
        HTTPHandler.clientError(res, {
            message: "Correo, nueva contraseña o passkey no ingresado correctamente",
            requiredParams: body
        });
    }


}

// Generar passkey
function createPasskey() {
    let codigo = '';
    const longitud = 24;
    const caracteres = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOOPASDFGHJKLZXCVBNM';

    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }

    return codigo;
}