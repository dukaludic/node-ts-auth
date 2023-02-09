"use strict";
exports.__esModule = true;
exports.generateAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function generateAccessToken(_a) {
    var email = _a.email;
    return jsonwebtoken_1["default"].sign(email, process.env.ACCESS_TOKEN_SECRET);
}
exports.generateAccessToken = generateAccessToken;
