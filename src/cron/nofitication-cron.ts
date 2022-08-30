import { checkTomorrowReservations } from "../db/bokings-db";
import { sendNotification } from "../notifications";
import { isError } from "../utils/resCkeck";

import {schedule} from "node-cron";

export const checkFutureReservations = () => {
    schedule("* 7 * * *", async () => {
        const res = await checkTomorrowReservations();
        if (isError(res)) return;
        res.forEach((device: { devicetoken: string; sitename: string; desk: number }) => {
            sendNotification(device.devicetoken, {
                badge: 1,
                title: "Reminder Prenotazione per domani",
                subtitle: `Desk ${device.desk}`,
                body: `Sede: ${device.sitename}`
            });
        });
    });
};