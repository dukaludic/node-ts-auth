import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Docs",
            version: "1.0.0"
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
                },
                cookieAuth: {
                    type: "apiKey",
                    in: 'cookie',
                    name: 'refreshToken'
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ['src/routes/*.router.ts'],
};


const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;