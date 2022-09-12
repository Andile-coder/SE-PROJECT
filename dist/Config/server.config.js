"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Wrapper_1 = require("../Middlewares/Wrapper");
const Booking_1 = __importDefault(require("../Routes/Booking"));
class ServerConfig {
    constructor() {
        this.server = (0, express_1.default)();
        this._routes();
    }
    getServer() {
        return this.server;
    }
    _routes() {
        this.server.use((0, cors_1.default)());
        this.server.get('/test', (_request, response) => {
            response.status(200).json({ msg: 'Test' });
        });
        this.server.get('/', (_request, response) => {
            response.status(200).json({ msg: '🔥MRANK-CLUB🔥' });
        });
        this.server.use(Booking_1.default);
        this.server.use(Wrapper_1.wrapper);
    }
}
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=server.config.js.map