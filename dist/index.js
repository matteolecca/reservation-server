"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
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
    ],
    credentials: true,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    sameSite: 'none'
};
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use(routers);
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT${PORT}`);
});
