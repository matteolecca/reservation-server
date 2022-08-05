import Express from "express";
import { Booking } from "./booking";

export interface CustomRequest extends Express.Request {
    userId?: string;
    password?: string;
}


export interface BookingRequest extends Express.Request {
    userId?: string;
    body: Booking;
}