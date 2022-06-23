import { checkTomorrowReservations } from "../db/bokings-db";
import { sendNotification } from "../notifications";
import { REMINDER_BOOKING } from "../notifications/consts";
import { isError } from "../utils/resCkeck";

var cron = require('node-cron');

export const schedule = () => {
    cron.schedule('* 12 * * *', async () => {
        console.log('checking tomorrow schedules');
        const res = await checkTomorrowReservations();
        if (isError(res)) return;
        res.forEach((device: { devicetoken: string; sitename: string; desk: number }) => {
            sendNotification(device.devicetoken, {
                badge: 1,
                title: 'Reminder Prenotazione per domani',
                subtitle: `Desk ${device.desk}`,
                body: `Sede: ${device.sitename}`
            })
        });
        console.log(res);
    });
}