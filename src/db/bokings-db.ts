import { Booking } from "../interfaces/booking";
import { trycatch } from "../utils/tryCatch";
import { DELETE_BOOKING, GET_NEXT_BOOKINGS, GET_PAST_BOOKINGS, GET_BOOKING, GET_BOOKINGS, INSERT_BOOKING } from "./consts";

export const getBookings = async (userId?: string) => await trycatch(GET_BOOKINGS, [userId]);
export const getPastBookings = async (userId?: string, offset?: any) => await trycatch(GET_PAST_BOOKINGS, [userId, +offset]);
export const getNextBookings = async (userId?: string) => await trycatch(GET_NEXT_BOOKINGS, [userId]);
export const getBooking = async (userId?: string, bookingId?: string) => await trycatch(GET_BOOKING, [userId, bookingId], true);
export const insertBooking = async ({ userId, date, desk, site }: Booking) => await trycatch(INSERT_BOOKING, [date, site, desk, userId]);
export const deleteBooking = async (userId: string, id: number) => await trycatch(DELETE_BOOKING, [id, userId]);