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
        app.use( '/api/documents', require('../routes/documents.route')(io) );
        app.use( '/api/oportunities', require('../routes/oportunity.route')(io) );



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