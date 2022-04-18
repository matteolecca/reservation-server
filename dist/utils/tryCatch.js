"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trycatch = void 0;
const db = require('../config/db-connect');
const trycatch = async (query, params, deeper) => {
    let result = null;
    try {
        result = await db.query(query, params);
    }
    catch (error) {
        return ({ error: error.message });
    }
    if (deeper)
        return result[0][0];
    return result[0];
};
exports.trycatch = trycatch;
