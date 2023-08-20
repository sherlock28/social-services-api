import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import ip from 'ip';
import { v1Routes } from '../routes/index.js';
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

    app.use(`/api/${getApiVersion()}/member`, v1Routes.memberRoutes);

    return app;
}

export default configureApp;
