const express = require('express')
const router = new express.Router()
const userRouter = require('./user-router');
const bookingsRouter = require('./bookings-router');
const notificationsRouter = require('./notification-router');
const placesRouter = require('./map-router');
router.use('/users', userRouter);
router.use('/bookings', bookingsRouter);
router.use('/notifications', notificationsRouter);
router.use('/places', placesRouter);
module.exports = router;
