"use strict";
exports.__esModule = true;
exports.validation = void 0;
var dotenv_1 = require("dotenv");
var jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1["default"].config();
var validation = function (req, res, next) {
    var _a;
    console.log('======================');
    var accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!accessToken)
        return res.sendStatus(401);
    jsonwebtoken_1["default"].verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        req.user = decoded;
    });
    next();
};
exports.validation = validation;
