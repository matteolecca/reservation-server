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
    console.log(token);
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
    const registeredDevices = await getUserRegisteredDevices(userId);
    sendNotification("dkD5mW_DoEW4kJsK5XC-Qa:APA91bGFZMsypDDYjVqDhlZxzdMGfE5DK2CIeEmVmrhxVRjT9k4Gojm7rri8wexgzauRG0MBiVgBeGmqK5m2YqdnOmNCGSU-N7otqeHshlDDPuxiXFE2dkGNf_6W9MDuRG3rGx7Y1R8N",
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
