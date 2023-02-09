// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { version } from '../../package.json';
// import { Express } from 'express';

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Docs",
//             version
//         },
//         components: {
//             securitySchemas: {
//                 bearerAuth: {
//                     type: "http",
//                     scheme: 'bearer',
//                     bearerFormat: "JWT"
//                 }
//             }
//         },
//         security: [
//             {
//                 bearerAuth: [],
//             }
//         ]
//     },
//     apis: ['*']
// }

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app: Express, port: string) {
//     // Swagger page
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//     // Docs in JSON format
//     app.get("/docs.json", (req, res) => {
//         console.log('swagger')
//         res.setHeader("Content-Type", "application/json");
//         res.send(swaggerSpec);
//     });
// }

// export default swaggerDocs