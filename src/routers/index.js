const express = require('express')
const router = new express.Router()
const userRouter = require('./user-router.ts');
const bookingsRouter = require('./bookings-router.ts');
const notificationsRouter = require('./notification-router.ts');
router.use('/users', userRouter);
router.use('/bookings', bookingsRouter);
router.use('/notifications', notificationsRouter);
module.exports = router;
