const FCM = require('fcm-node')

var serverKey = 'AAAA8-nd2-E:APA91bGgQpEDneMHDdmJi2TzIaKFar0QCYqMKrHKDPEvIXA1gDMLdupk9mu_86em9bXl2L9yHWu4DQR0ijv4UjHYU1dCxDMiqqrrDrbWOyAMurYeD9z6-UC6lKaclXb2FRNXhj_HjwhA'
var fcm = new FCM(serverKey)



export const sendNotification = (token: string, message: { title: string, body: string }) => {
    const notificationMessage = generateNotificationBody(token, message);
    fcm.send(notificationMessage, function (err: any, response: any) {
        if (err) {
            console.log("Something has gone wrong!", err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    });
};

const generateNotificationBody = (token: string, message: { title: string, body: string }) => {
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
    }
}