"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class dbConfig {
    getPool() {
        this.pool = new pg_1.Pool({
            connectionString: process.env.DB,
        });
        return this.pool;
    }
}
exports.dbConfig = dbConfig;
//# sourceMappingURL=db.config.js.map