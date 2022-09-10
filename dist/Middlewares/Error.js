"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
    static badRequest(message) {
        return new APIError(400, message);
    }
    static notFound(message) {
        return new APIError(404, message);
    }
    static internalError(message) {
        return new APIError(500, message);
    }
    static forbidden(message) {
        return new APIError(403, message);
    }
    static conflict(code, detail) {
        if (detail.includes('email') && code === '23505') {
            return new APIError(409, 'Account with this email already exist');
        }
        return new APIError(409, 'Unknown conflict occured');
    }
    static unAuthorized(message) {
        return new APIError(401, message);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=Error.js.map