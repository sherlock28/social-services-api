import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from '../../config/logger.js';
import path from 'path';

// Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Social Service API", version: "1.0.0" },
    },
    apis: [path.join(process.cwd(), '/src/routes/v1/*.route.js')], 
};
console.log(path.join(process.cwd(), '/src/routes/v1/*.route.js'));
// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    logger.info(`📒 Version 1 Docs are available on http://localhost:${port}/api/v1/docs`);
};

export { swaggerDocs };