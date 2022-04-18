"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bokings_db_1 = require("../db/bokings-db");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const resCkeck_1 = require("../utils/resCkeck");
const express = require('express');
const router = new express.Router();
const _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTNjNWM0LTRkZjUtNDdjOC1iNzgyLTJlZjM0ODg3ZGJkYSIsImlhdCI6MTY0OTQ5NzUxNiwiZXhwIjo0MjQxNDk3NTE2fQ.mBZMITog-1ixYooDj1wcbVTpvoMzgYzX4uxBlMCEi1U';
router.get('/:bookingId', auth_middleware_1.checkToken, async (req, res) => {
    const { bookingId } = req.params;
    const { userId } = req;
    const booking = await (0, bokings_db_1.getBooking)(userId, bookingId);
    console.log(booking);
    setTimeout(() => {
        return res.send(booking);
    }, 1000);
});
router.get('/', auth_middleware_1.checkToken, async (req, res) => {
    const { userId } = req;
    const { type, offset } = req.query;
    let bookings;
    switch (type) {
        case 'past':
            bookings = await (0, bokings_db_1.getPastBookings)(userId, offset);
            break;
        default:
            bookings = await (0, bokings_db_1.getNextBookings)(userId);
            break;
    }
    console.log(bookings, "BOOKINGS");
    return res.send(bookings);
});
router.post('/', auth_middleware_1.checkToken, async (req, res) => {
    const { userId, body } = req;
    console.log(body, userId);
    const inserted = await (0, bokings_db_1.insertBooking)({
        ...body,
        userId
    });
    if ((0, resCkeck_1.isError)(inserted))
        return res.status(400).send({ message: 'Server error' });
    res.send();
});
router.delete('/:id', auth_middleware_1.checkToken, async (req, res) => {
    console.log("id", req.params.id);
    setTimeout(() => {
        return res.send();
    }, 2000);
    // console.log(req.params.id, "PARAM ID");
    // const { userId } = req;
    // const { id } = req.params;
    // if (!id) return res.status(400).send({ message: 'Error deleting' });
    // console.log(id, "ID", userId, "USERID");
    // const result = await deleteBooking(userId!, +id);
    // console.log(result);
    // if (isError(result)) return res.status(400).send({ message: 'Error deleting' });
    // res.send();
});
module.exports = router;
