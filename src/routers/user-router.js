"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_1 = require("../db/user-db");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const userGenerator_1 = require("../utils/userGenerator");
const webTokenValidator_1 = require("../utils/webTokenValidator");
const resCkeck_1 = require("../utils/resCkeck");
const express = require('express');
const router = new express.Router();
router.get('/user-data', auth_middleware_1.checkToken, async (req, res) => {
    const { userId } = req;
    console.log(userId);
    const user = await (0, user_db_1.getUserById)(userId);
    setTimeout(() => {
        res.send(user);
    }, 2000);
});
router.post('/login', async (req, res) => {
    const { password, username, email } = req.body;
    const user = await (0, user_db_1.getUser)(email, username);
    console.log(user);
    if (!user)
        return res.status(400).send({ message: 'No User' });
    if ((0, resCkeck_1.isError)(user))
        return res.status(400).send({ message: 'Server error' });
    const validPwd = await (0, userGenerator_1.validateUserPassword)(password, user.password);
    if (!validPwd)
        return res.status(400).send({ message: 'Invalid credentials' });
    const token = (0, webTokenValidator_1.generateToken)(user.id);
    return res.send({ token });
});
router.post('/signup', async (req, res) => {
    const { username, email } = req.body;
    const existingEmail = await (0, user_db_1.checkEmailTaken)(email);
    if (existingEmail.exist)
        return res.status(400).send({ message: 'E-Mail already taken' });
    const existingUsername = await (0, user_db_1.checkUsernameTaken)(username);
    if (existingUsername.exist)
        return res.status(400).send({ message: 'Username already taken' });
    const user = await (0, userGenerator_1.generateUser)(req.body);
    if (!user)
        return res.status(400).send({ message: 'No User' });
    if ((0, resCkeck_1.isError)(user))
        return res.status(400).send({ message: 'Server error' });
    const inserted = await (0, user_db_1.createUser)(user);
    if ((0, resCkeck_1.isError)(inserted))
        return res.status(400).send({ message: 'Server error' });
    const token = (0, webTokenValidator_1.generateToken)(user.id);
    return res.send({ token });
});
router.post('/validate-token', async (req, res) => {
    const { token } = req.body;
    if (!token)
        return res.status(400).send({ message: 'No token provided' });
    const validToken = await (0, webTokenValidator_1.validateToken)(token);
    if (validToken.error)
        return res.status(400).send({ message: 'Invalid token' });
    return res.send({ valid: true });
});
router.post('/update-password', auth_middleware_1.checkToken, async (req, res) => {
    const { userId } = req;
    const { password } = req.body;
    const encrPwd = await (0, userGenerator_1.generateNewPassword)(password);
    if (encrPwd.password)
        return res.status(400).send({ message: encrPwd.error });
    const update = await (0, user_db_1.updateUserPassword)(encrPwd, userId);
    if (update.error)
        return res.status(400).send({ message: update.error });
    return res.send();
});
module.exports = router;
