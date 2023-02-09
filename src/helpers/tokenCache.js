"use strict";
exports.__esModule = true;
var node_cache_1 = require("node-cache");
var TokenCache = /** @class */ (function () {
    function TokenCache() {
        this.nodeCache = new node_cache_1["default"]();
    }
    TokenCache.prototype.tryGet = function (id) {
        return this.nodeCache.get(id);
    };
    TokenCache.prototype.set = function (id, refreshToken) {
        this.nodeCache.set(id, refreshToken);
    };
    TokenCache.prototype.clear = function (id) {
        this.nodeCache.del(id);
    };
    return TokenCache;
}());
exports["default"] = new TokenCache();
