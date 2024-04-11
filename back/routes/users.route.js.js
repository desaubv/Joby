const { Router } = require('express');
const router = Router();

function routes(io) {
    const controller = require('../controllers/users.controller')(io);

    router.route('/:id')
        .put(controller.update)
    

    return router;
}

module.exports = routes;
