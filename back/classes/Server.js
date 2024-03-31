const express = require('express');
const color = require('colors/safe');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");
const Sockets = require('../classes/Sockets');
const Database = require('../classes/Database');
require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.server = http.createServer( this.app );
        this.io = socketIo( this.server, {
            cors: '*'
        } );

        new Database();
        new Sockets( this.io );
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( 
            fileUpload({
                useTempFiles: true,
                limits: {fileSize: 50 * 2024 * 1024}
            })
        );

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
    }

    routes() {
        // Index
        this.app.get('/', (req, res) => {
            res.send('Backend');
        });

        // Rutas
        this.app.use('/api/login', require('../routes/login.route')(this.io));
        this.app.use('/api/documents', require('../routes/documents.route')(this.io));
        
        // Rutas no configuradas mandar mensaje de error
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Ruta no configurada',
                method: req.method,
                route:   req.originalUrl
            });
        });
    }

    start(){
        this.server.listen( this.port, () => {
            console.clear();
            console.log( color.cyan('[ SERVER ]   Launched on port', this.port ));
        });
    }

}

module.exports = Server;