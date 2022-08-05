import { Request, Response } from "express";
import { checkDeviceRegistered, getUserRegisteredDevices, registerUserDevice, updateRegisteredUserDevice } from "../db/user-db";
import { checkToken } from "../middlewares/auth-middleware";
import { sendNotification } from "../notifications";
import express from "express";
import { CustomRequest } from "../interfaces/custom-request";
const router = express.Router();

router.post("/subscribe", checkToken, async (req: CustomRequest, res: Response) => {
    const { userId } = req;
    const { token } = req.body;
    if (!token || !userId) return res.send();
    const { count } = await checkDeviceRegistered(userId, token);
    if (count) {
        await updateRegisteredUserDevice(userId, token);
        return res.send();
    }
    await registerUserDevice(userId, token);
    res.send();
});

router.post("/fake", async (req: Request, res: Response) => {
    const { userId } = req.body;
    console.log(userId);
    const registeredDevices = await getUserRegisteredDevices(userId);
    sendNotification("eNEVEgM3K0Gaq8mGabbt_d:APA91bEQg0T9MOjHvBgfMH9J4ksscJpSpG9dhofQRLpwF2eictGHuVb450REcJlF5u3Q7PA62p_e06-myJWpMeiO8PhZz2jVkHAhwSsTLN3ZhmBW5PR4jrU2AZo8qzfBKRK0CjBQQaHa",
        {
            title: "Reminder Prenotazione",
            body: "12-08-2022",
            badge: 1,
            subtitle: "Desk 3"
        });
    // registeredDevices.forEach((device: { deviceToken: string }) => {
    // });
    res.send();
});
export default router;
