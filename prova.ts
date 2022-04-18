import { sendNotification } from "./src/notifications";

const f = () =>{
    sendNotification('fJkYk4MiThmsQEhhnCgoFu:APA91bFYDW4cBxlwwa9HkrGPlrTNk2yGPS5tq2jXro_q1scDd1nohqiT5M-dv5vra5Ogmh88ALETzTAAJUq6yPxdkfP5krQ2Nre4hyPPTxteSkvD0LfkXfPeJHzpNne6mp46IixWQJpi',
    {
        body: 'You have a booked slot for tomorroe',
        title: 'Reminder'
    });
}

f();