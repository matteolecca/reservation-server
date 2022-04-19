import { Request, Response } from 'express';
import { checkDeviceRegistered, registerUserDevice, updateRegisteredUserDevice } from '../db/user-db';
import { CustomRequest } from '../interfaces/custom-request';
import { checkToken } from '../middlewares/auth-middleware';
import { sendNotification } from '../notifications';
const express = require('express');
const router = new express.Router();

router.post('/subscribe', checkToken, async (req: any, res: Response) => {
    const { userId } = req;
    const { token } = req.body;
    if (!token) return res.send();
    const { count, error } = await checkDeviceRegistered(userId!, token);
    if (count) {
        const update = await updateRegisteredUserDevice(userId!, token);
        console.log('UPDATED', update);
        return res.send();
    }
    await registerUserDevice(userId!, token);
    res.send();
});

router.post('/fake', (req: any, res: any) => {
    const { token } = req.body;
    sendNotification(token,
        {
            title: 'Reminder',
            body: 'REi'
        });
        console.log('idsjdisjsidsj')
    res.send();
})
module.exports = router
