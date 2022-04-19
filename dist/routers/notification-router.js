"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_1 = require("../db/user-db");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const notifications_1 = require("../notifications");
const express = require('express');
const router = new express.Router();
router.post('/subscribe', auth_middleware_1.checkToken, async (req, res) => {
    const { userId } = req;
    const { token } = req.body;
    if (!token)
        return res.send();
    const { count, error } = await (0, user_db_1.checkDeviceRegistered)(userId, token);
    if (count) {
        const update = await (0, user_db_1.updateRegisteredUserDevice)(userId, token);
        console.log('UPDATED', update);
        return res.send();
    }
    await (0, user_db_1.registerUserDevice)(userId, token);
    res.send();
});
router.post('/fake', (req, res) => {
    const { token } = req.body;
    (0, notifications_1.sendNotification)(token, {
        title: 'Reminder',
        body: 'REi'
    });
    console.log('idsjdisjsidsj');
    res.send();
});
module.exports = router;
