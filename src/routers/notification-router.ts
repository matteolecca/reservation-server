import { Request, Response } from 'express';
import { checkDeviceRegistered, getUserRegisteredDevices, registerUserDevice, updateRegisteredUserDevice } from '../db/user-db';
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
        await updateRegisteredUserDevice(userId!, token);
        return res.send();
    }
    await registerUserDevice(userId!, token);
    res.send();
});

router.post('/fake', async (req: any, res: any) => {
    const { userId } = req.body;
    console.log(userId);
    const registeredDevices = await getUserRegisteredDevices(userId);
    registeredDevices.forEach((device: { deviceToken: string }) => {
        sendNotification(device.deviceToken,
            {
                title: 'Reminder',
                body: 'REi'
            });
    });
    res.send();
})
module.exports = router
