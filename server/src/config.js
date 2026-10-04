const config = {
    // Application
    app: { 
        language: "en",
        "timeZone": "America/Mexico_City"
    },

    // Server 
    server: {
        http: {
            port: 8080,
            host: "localhost"
        },
        express: {
            trustProxy: false
        },
        bodyParser: {
            type: "text",

        },
        staticPath: "src/public"
    },

    // APIs
    api: {
        prefix: "/api"
    },
    
    // Logger
    logger: {
        format: {
            timestampFormat: "DD-MM-YYYY hh:mm:ss",
            titleCase: "uppercase"
        },
        save: {
            infoFilePath: null,
            logFilePath: null,
            errorFilePath: "logs/error.log",
            warningFilePath: "logs/warning.log"
        },
        color: {
            logColor: "blue",
            infoColor: "green",
            errorColor: "red",
            warningColor: "yellow",
            debugColor: null
        }
    }
}

module.exports = config;