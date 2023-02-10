import swaggerJsdoc from 'swagger-jsdoc';

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
    apis: ['src/routes/user.router.ts'],
};


const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;