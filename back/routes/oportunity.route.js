const { Router } = require('express');
const router = Router();

function Login(io) {
    const controller = require('../controllers/oportunity.controller')(io);

    router.route('/')
        .post(controller.create)
    

    return router;
}

module.exports = Login;
