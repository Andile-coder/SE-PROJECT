"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("../Controllers/Auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
const Controller = new Auth_1.AuthController();
router.post('/api/signup', (request, response, next) => {
    Controller.signup(request, response, next);
});
exports.default = router;
//# sourceMappingURL=Auth.js.map