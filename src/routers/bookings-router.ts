import { Console } from 'console';
import Express from 'express';
import { deleteBooking, getBooking, getBookings, getNextBookings, getPastBookings, insertBooking } from '../db/bokings-db';
import { BookingRequest, CustomRequest } from '../interfaces/custom-request';
import { checkToken } from '../middlewares/auth-middleware';
import { isError } from '../utils/resCkeck';
import { validateToken } from '../utils/webTokenValidator';
const express = require('express');
const router = new express.Router()
const _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTNjNWM0LTRkZjUtNDdjOC1iNzgyLTJlZjM0ODg3ZGJkYSIsImlhdCI6MTY0OTQ5NzUxNiwiZXhwIjo0MjQxNDk3NTE2fQ.mBZMITog-1ixYooDj1wcbVTpvoMzgYzX4uxBlMCEi1U';

router.get('/:bookingId', checkToken, async (req: CustomRequest, res: any) => {
    const { bookingId } = req.params;
    const { userId } = req;
    const booking = await getBooking(userId, bookingId);
    console.log(booking)
    setTimeout(() => {
        return res.send(booking);
    }, 1000);
});

router.get('/', checkToken, async (req: CustomRequest, res: any) => {
    const { userId } = req;
    const { type, offset } = req.query;
    let bookings;
    switch (type) {
        case 'past':
            bookings = await getPastBookings(userId, offset);
            break;
        default:
            bookings = await getNextBookings(userId);
            break;
    }
    return res.send(bookings);
});

router.post('/', checkToken, async (req: BookingRequest, res: any) => {
    const { userId, body } = req;
    const inserted = await insertBooking({
        ...body,
        userId
    });
    if (isError(inserted)) return res.status(400).send({ message: 'Server error' });
    res.send();
});

router.delete('/:id', checkToken, async (req: BookingRequest, res: any) => {
    console.log(req.params.id, "PARAM ID");
    const { userId } = req;
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Error deleting' });
    console.log(id, "ID", userId, "USERID");
    const result = await deleteBooking(userId!, +id);
    console.log(result);
    if (isError(result)) return res.status(400).send({ message: 'Error deleting' });
    res.send();
})



module.exports = router
