import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import ip from 'ip';
import { v1Routes } from '../routes/index.js';
import { swaggerDocs as V1SwaggerDocs } from '../routes/v1/swagger.js';
import { pathNotFound } from '../middlewares/pathNotFound.js';
import { HttpStatusCode } from '../const/statusCodes.js';
import { env } from './env.js';

const getApiVersion = () => {
    const version = env.VERSION ?? 1;
    return `v${version}`;
}

const configureApp = (app) => {

    // settings
    app.set('port', env.PORT || 5000);

    if (env.NODE_ENV === "development")
        env.APP_DOMAIN = ip.address() + ":" + env.PORT;

    // middlewares
    app.use(morgan("short"));
    app.use(cors());
    app.use(express.json());

    // routes
    app.get('/', (_, res) => {
        res.status(HttpStatusCode.OK).json({
            message: `Social service`,
            version: getApiVersion()
        });
    });

    app.use(`/api/${getApiVersion()}/members`, v1Routes.memberRoutes);
    app.use(`/api/${getApiVersion()}/users`, v1Routes.userRoutes);
    
    if (env.NODE_ENV === "development")
        V1SwaggerDocs(app, app.get('port'));

    app.use(pathNotFound);

    return app;
}

export default configureApp;
