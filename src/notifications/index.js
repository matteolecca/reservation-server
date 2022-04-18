"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const FCM = require('fcm-node');
var serverKey = 'AAAA8-nd2-E:APA91bGgQpEDneMHDdmJi2TzIaKFar0QCYqMKrHKDPEvIXA1gDMLdupk9mu_86em9bXl2L9yHWu4DQR0ijv4UjHYU1dCxDMiqqrrDrbWOyAMurYeD9z6-UC6lKaclXb2FRNXhj_HjwhA';
var fcm = new FCM(serverKey);
const sendNotification = (token, message) => {
    const notificationMessage = generateNotificationBody(token, message);
    fcm.send(notificationMessage, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!", err);
        }
        else {
            console.log("Successfully sent with response: ", response);
        }
    });
};
exports.sendNotification = sendNotification;
const generateNotificationBody = (token, message) => {
    const { title, body } = message;
    return {
        collapse_key: 'your_collapse_key',
        to: token,
        notification: {
            title,
            body
        },
        data: {
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
};
