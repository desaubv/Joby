const { Router } = require('express');
const router = Router();

function Login(io) {
    const controller = require('../controllers/login.controller')(io);

    router.route('/')
        .post( controller.login )

    router.route('/signin/:userId/:state')
        .post( controller.signIn )

    router.route('/forgot/:state')
        .post( controller.forgotPassword )
    

    return router;
}

module.exports = Login;

