"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPassword = exports.generateNewPassword = exports.generateUser = void 0;
const bcrypt = require("bcrypt");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const generateUser = async (userdata) => {
    if (!validator.isEmail(userdata.email)) {
        return { error: "invalid email" };
    }
    if (userdata.password.length < 1) {
        return { error: "password too short" };
    }
    const user = {
        ...userdata,
        password: await bcrypt.hash(userdata.password, 8),
        id: uuidv4(),
    };
    return user;
};
exports.generateUser = generateUser;
const generateNewPassword = async (password) => {
    try {
        const newPassword = await bcrypt.hash(password, 8);
        return newPassword;
    }
    catch (error) {
        return { error: "Invalid password" };
    }
};
exports.generateNewPassword = generateNewPassword;
const validateUserPassword = async (password, userPassword) => (await bcrypt.compare(password, userPassword));
exports.validateUserPassword = validateUserPassword;
