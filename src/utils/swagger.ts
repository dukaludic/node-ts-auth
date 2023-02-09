// TS ignore shouln't be used normally, but Swagger types were creating issues
// with Typescript build in my case and would require some time to fix

import swaggerJsdoc from 'swagger-jsdoc';

import authRouter from '../routes/auth.router'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Docs",
            version: "1.8.6"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: 'bearer',
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['../routes/user.router.ts'],
};


const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;