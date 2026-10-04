const fs = require("fs");
const Path = require("path")

const { Server, logger } = require("@desaubv/quik");

const config = require("./config.js");
require("./logger");

const server = Server();
const validExtensions = [".js", ".ts"];

/* Auto Load Middlewares */
try {
    const basePath = "./src/middlewares";
    const middlewaresMap = fs.readdirSync(basePath);

    middlewaresMap.forEach((route) => {
        const filePath = Path.resolve(basePath, route);
        const ext = Path.extname(filePath);

        if (!validExtensions.includes(ext)) {
            return;
        }

        const loadedModule = require(filePath);
        const middleware = loadedModule.default ?? loadedModule;

        if (typeof middleware !== "function") {
            throw new TypeError(
                `Middleware "${route}" does not export a function`
            );
        }

        server.addMiddleware(middleware);
    });
} catch (err) {
    switch (err.code) {
        case "ENOENT":
            break;

        case "EACCES":
            logger.error("[ Permission denied ]:", err.message);
            break;

        default:
            logger.error("[ Error loading MIDDLEWARES ]:", err.message);
    }
}

/* Auto Load routes */
let routesMap = {};
try {
    const basePath = "./src/routes";
    routesMap = loadRouteDir(basePath, config.api?.prefix);
    if (Object.keys(routesMap).length === 0) {
        logger.warning(`No routes found to load in ${basePath}.`);
    }
} catch (err) {
    if (err instanceof Error && "code" in err) {
        switch (err.code) {
            case "ENOENT":
                logger.error("[ Routes dir not found ]:", err.message);
                break;

            case "EACCES":
                logger.error("[ Permission denied ]:", err.message);
                break;

            default:
                logger.error("[ Error loading routes ]:", err.message);
        }
    } else {
        logger.error(err);
    }
}

for (const key in routesMap) {
    const router = routesMap[key];

    try {
        server.addRoute(key, router);
    } catch (err) {
        logger.error("[ Error adding router ]", err.message);
    }
}

/* Auto load Cron */
let cronMap = [];
try {
    const basePath = "./src/cron";
    cronMap = loadCronDir(basePath);

} catch (err) {
    if (err instanceof Error && "code" in err) {
        switch (err.code) {
            case "ENOENT":
                logger.error("[ Cron dir not found ]:", err.message);
                break;

            case "EACCES":
                logger.error("[ Permission denied ]:", err.message);
                break;

            default:
                logger.error("[ Error loading cron ]:", err.message);
        }
    } else {
        logger.error(err);
    }
}

for (const i in cronMap) {
    const cron = cronMap[i];

    try {
        server.addCron(cron);
    } catch (err) {
        logger.error("[ Error adding cron ]", err.message);
    }
}

/* Static html */
const staticPath = config.server.staticPath;
if (staticPath) {
    server.addStaticDir(staticPath);
}

// Load ws
if (fs.existsSync(Path.resolve("./src/ws.js"))) {
    server.useWebSocket(require("./ws_"));
}

// Load socket.io
if (fs.existsSync(Path.resolve("./src/socket.js"))) {
    server.useSocketIO(require("./socket"));
}

// Load config
server.setConfig({
    ...config.server,
    language: config.app.language
});

module.exports = server;

/* Funciones auxiliares */
// Auto Load routes
function loadRouteDir(basePath, base = "") {
    let routesMap = {};
    const routes = fs.readdirSync(basePath);
    base = base == "" ? base : `${base}/`;

    routes.forEach((route) => {
        const path = Path.resolve(basePath, route);
        const stats = fs.statSync(path);
        const ext = Path.extname(path);
        const basename = Path.parse(path).name;

        if (stats.isDirectory()) {
            let routesInDir = loadRouteDir(path, base + route);
            routesMap = {
                ...routesMap,
                ...routesInDir
            }
        }

        if (!validExtensions.includes(ext)) {
            return
        }

        const key = basename.toLocaleLowerCase() == "default"
            ? base + ""
            : base + basename;
        routesMap[key] = require(path);
    });

    return routesMap;
}

// Auto load Cron
function loadCronDir(basePath) {
    let cronMap = [];
    const routes = fs.readdirSync(basePath);

    routes.forEach((route) => {
        const path = Path.resolve(basePath, route);
        const stats = fs.statSync(path);
        const ext = Path.extname(path);

        if (stats.isDirectory()) {
            let cronsInDir = loadCronDir(path);
            cronMap.push(...cronsInDir);
        }

        if (!validExtensions.includes(ext)) {
            return
        }

        cronMap.push(require(path));
    });

    return cronMap;
}