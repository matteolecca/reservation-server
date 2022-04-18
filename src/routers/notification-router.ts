import { Request, Response } from 'express';
import { checkDeviceRegistered, registerUserDevice, updateRegisteredUserDevice } from '../db/user-db';
import { CustomRequest } from '../interfaces/custom-request';
import { checkToken } from '../middlewares/auth-middleware';
import { sendNotification } from '../notifications';
const express = require('express');
const router = new express.Router();

router.post('/subscribe', checkToken, async (req: CustomRequest, res: Response) => {
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
    sendNotification('fJkYk4MiThmsQEhhnCgoFu:APA91bFYDW4cBxlwwa9HkrGPlrTNk2yGPS5tq2jXro_q1scDd1nohqiT5M-dv5vra5Ogmh88ALETzTAAJUq6yPxdkfP5krQ2Nre4hyPPTxteSkvD0LfkXfPeJHzpNne6mp46IixWQJpi',
        {
            title: 'Reminder',
            body: 'REi'
        });
    res.send();
})
module.exports = router
