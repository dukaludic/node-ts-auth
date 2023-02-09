"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
var tokenCache_1 = require("../helpers/tokenCache");
var helpers_1 = require("../helpers");
dotenv_1["default"].config();
var router = (0, express_1.Router)();
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repo, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repo = new auth_controller_1.AuthController();
                console.log('login start');
                return [4 /*yield*/, repo.login(req.body)];
            case 1:
                accessToken = _a.sent();
                return [2 /*return*/, accessToken];
        }
    });
}); });
router.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, email, repo, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                jsonwebtoken_1["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
                    if (err)
                        res.sendStatus(403);
                    email = decoded.email;
                });
                repo = new auth_controller_1.AuthController();
                return [4 /*yield*/, repo.logout(email)];
            case 1:
                response = _b.sent();
                console.log(response);
                return [2 /*return*/];
        }
    });
}); });
router.get('/refresh', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, email, refreshToken;
    var _a;
    return __generator(this, function (_b) {
        accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        email = jsonwebtoken_1["default"].decode(accessToken).email;
        refreshToken = tokenCache_1["default"].tryGet(email);
        console.log(refreshToken, 'refresh token');
        if (!refreshToken)
            return [2 /*return*/, res.sendStatus(403)];
        //refresh access token
        jsonwebtoken_1["default"].verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
            if (err)
                return res.sendStatus(403);
            var accessToken = (0, helpers_1.generateAccessToken)({ email: email });
            console.log(accessToken, '====accessToken');
            res.json({ accessToken: accessToken });
        });
        return [2 /*return*/];
    });
}); });
exports["default"] = router;
