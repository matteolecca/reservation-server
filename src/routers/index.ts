import express, { Router } from "express";
const router : Router = express.Router();
import userRouter from "./user-router";
import bookingsRouter from "./bookings-router";
import notificationsRouter from "./notification-router";
import placesRouter from "./map-router";
router.use("/users", userRouter);
router.use("/bookings", bookingsRouter);
router.use("/notifications", notificationsRouter);
router.use("/places", placesRouter);

export default router;