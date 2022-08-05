import { deleteBooking, getBooking, getNextBookings, getPastBookings, insertBooking } from "../db/bokings-db";
import { BookingRequest, CustomRequest } from "../interfaces/custom-request";
import { checkToken } from "../middlewares/auth-middleware";
import { isError } from "../utils/resCkeck";
import express, { Response } from "express";
import { Booking } from "../interfaces/booking";
const router = express.Router();

router.get("/:bookingId", checkToken, async (req: CustomRequest, res: Response) => {
    const { bookingId } = req.params;
    const { userId } = req;
    const booking = await getBooking(userId, bookingId);
    if(isError(booking)){
        return res.status(500).send({error: "Server error"});
    }
    res.send(booking);
});

router.get("/", checkToken, async (req: CustomRequest, res: Response) => {
    const { userId } = req;
    const { type, offset } = req.query;
    let bookings: any ;
    switch (type) {
    case "past":
        bookings = await getPastBookings(userId, offset ? +offset : 0);
        break;
    default:
        bookings = await getNextBookings(userId);
        break;
    }
    if(isError(bookings)){
        return res.status(500).send({error: "Server error"});
    }
    return res.send(bookings);
});

router.post("/", checkToken, async (req: BookingRequest, res: any) => {
    const { userId, body } = req;
    const inserted = await insertBooking({
        ...body,
        userId
    });
    if (isError(inserted)) return res.status(500).send({ message: "Server error" });
    res.send();
});

router.delete("/:id", checkToken, async (req: BookingRequest, res: any) => {
    console.log(req.params.id, "PARAM ID");
    const { userId } = req;
    const { id } = req.params;
    if (!id) return res.status(401).send({ message: "Unhautorized" });
    const result = await deleteBooking(userId!, +id);
    if (isError(result)) return res.status(500).send({ message: "Error deleting" });
    res.send();
});



export default router;
