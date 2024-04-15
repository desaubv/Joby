class Routes {

    constructor(app, io) {

        this.configureRoutes(app, io);
    }

    configureRoutes(app, io){
        // Index
        app.get('/', (req, res) => {
            res.send('Backend');
        });


        // Configurar las rutas
        app.use( '/api/login', require('../routes/login.route')(io) );
        app.use( '/api/users', require('../routes/users.route.js')(io) );
        app.use( '/api/documents', require('../routes/documents.route')(io) );
        app.use( '/api/oportunity', require('../routes/oportunity.route')(io) );
        app.use( '/api/conversations', require('../routes/conversation.route')(io) );
        app.use( '/api/enterprise', require('../routes/enterprise.route')(io) );



        // Rutas no configuradas mandar mensaje de error
        app.use((req, res) => {
            res.status(404).json({
                message: 'Ruta no configurada',
                method:  req.method,
                route:   req.originalUrl,
                type:    "ROUTE_NOT_CONFIGURED"
            });
        });
    }

}

module.exports = Routes;