"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const webTokenValidator_1 = require("../utils/webTokenValidator");
const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(400).send({ error: 'No token' });
    const { id } = await (0, webTokenValidator_1.validateToken)(authorization);
    // @ts-ignore
    req.userId = id;
    next();
};
exports.checkToken = checkToken;
