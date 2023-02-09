"use strict";
exports.__esModule = true;
var swagger_jsdoc_1 = require("swagger-jsdoc");
var swagger_ui_express_1 = require("swagger-ui-express");
var package_json_1 = require("../../package.json");
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Docs",
            version: package_json_1.version
        },
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
                bearerAuth: []
            }
        ]
    },
    apis: ['*']
};
var swaggerSpec = (0, swagger_jsdoc_1["default"])(options);
function swaggerDocs(app, port) {
    // Swagger page
    app.use("/docs", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swaggerSpec));
    // Docs in JSON format
    app.get("/docs.json", function (req, res) {
        console.log('swagger');
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}
exports["default"] = swaggerDocs;
