"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const dotenv_1 = require("dotenv");
const server_config_1 = require("./Config/server.config");
(0, dotenv_1.config)();
class API {
    constructor() {
        var _a;
        this.PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4231;
        this.serverConfig = new server_config_1.ServerConfig();
        this.server = this.serverConfig.getServer();
        this.init();
    }
    init() {
        this.server.listen(this.PORT, () => {
            return console.log(`Server started in PORT ${this.PORT} 🚀`);
        });
    }
}
exports.API = API;
new API();
//# sourceMappingURL=server.js.map