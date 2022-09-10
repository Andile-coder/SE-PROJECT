"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    signup(request, response, next) {
        return response.status(200).json({ msg: 'SIGNUP SUCCESS' });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=Auth.js.map