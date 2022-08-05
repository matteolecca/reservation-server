import express, { Application } from "express";
import { corsOptions } from "./config/cors";
import { schedule } from "./cron/nofitication-cron";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers";
const app: Application = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors(corsOptions));
app.use(routers);

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT${PORT}`);
    schedule();
});


