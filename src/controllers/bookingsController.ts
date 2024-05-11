import { Request, Response } from 'express';
import bookingList from '../data/bookings.json';

export const getAllBookings = (req: Request, res: Response) => {
  res.status(200).json(bookingList);
};

export const getBookingById = (req: Request, res: Response) => {
  const { id } = req.params;

  const booking = bookingList.find(booking => booking.guest.reservationID === id);

  if (!booking) res.status(404).json({ message: `Booking with id ${id} not found` });

  res.status(200).json(booking);
};
