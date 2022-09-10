"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapper = void 0;
const Error_1 = require("./Error");
const wrapper = (error, _request, response, _next) => {
    if (error instanceof Error_1.APIError) {
        return response.status(error.status).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Server cannot determine error, contact support' });
};
exports.wrapper = wrapper;
//# sourceMappingURL=Wrapper.js.map