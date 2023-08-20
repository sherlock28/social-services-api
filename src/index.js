import express from 'express';
import configureApp from './config/app.js';
import logger from './config/logger.js';
import { env } from './config/env.js';
import { swaggerDocs as V1SwaggerDocs } from './routes/v1/swagger.js';

const app = configureApp(express());

app.listen(app.get('port'), () => {
    logger.info('🚀 Server Running');
    logger.info('Node Environment: ' + env.NODE_ENV);
    if (env.NODE_ENV === "development") {
        logger.info(`Local:            http://localhost:${env.PORT}`);
        logger.info(`On Your Network:  http://${env.APP_DOMAIN}`);
        V1SwaggerDocs(app, app.get('port'));
    }
});
