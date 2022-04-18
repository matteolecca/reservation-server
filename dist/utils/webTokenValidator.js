"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.validateToken = void 0;
var jwt = require('jsonwebtoken');
const validateToken = (token) => {
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'spindoxsucks');
        return decoded;
    }
    catch (error) {
        return { error: error };
    }
};
exports.validateToken = validateToken;
const generateToken = (id) => {
    console.log("Generating token");
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET || 'spindoxsucks', {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    return token;
};
exports.generateToken = generateToken;
