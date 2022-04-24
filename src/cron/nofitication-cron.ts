import { checkTomorrowReservations } from "../db/bokings-db";
import { sendNotification } from "../notifications";
import { REMINDER_BOOKING } from "../notifications/consts";

var cron = require('node-cron');

cron.schedule('* 9 * * *', async () => {
    console.log('checking tomorrow schedules');
    const res = await checkTomorrowReservations();
    res.forEach((device: { deviceToken: string }) => sendNotification(device.deviceToken, REMINDER_BOOKING));
});