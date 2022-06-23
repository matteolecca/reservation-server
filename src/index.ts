import express, { Request, Response, Application } from 'express';
import { schedule } from './cron/nofitication-cron';
import { updateUserPassword } from './db/user-db';
import { generateNewPassword } from './utils/userGenerator';
const app: Application = express();

require('dotenv').config()
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const routers = require('./routers');

var corsOptions = {
    origin: [
        'http://localhost:8100',
        'http://localhost:3000',
        'http://192.168.1.180:8100',
        'http://192.168.36.166:8100',
        'capacitor://localhost',
        'http://172.20.10.4:8100',
        'http://192.168.1.10:8100',
        'http://localhost',
        'http://192.168.1.180:8101',
    ],
    credentials: true,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    sameSite: 'none'
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(routers);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT${PORT}`);
    // schedule();
})


