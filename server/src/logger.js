const { logger } = require("@desaubv/quik");
const config = require("./config.js");

logger.setConfig({
    ...config.logger,
    language: config.app.language,
    format: {
        timeZone: config.app.timeZone,
    }
});

logger.clear();
