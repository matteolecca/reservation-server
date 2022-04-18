"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.isUser = void 0;
const isUser = (object) => {
    return 'id' in object;
};
exports.isUser = isUser;
const isError = (object) => {
    return 'error' in object;
};
exports.isError = isError;
