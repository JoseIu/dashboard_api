import { Request, Response } from 'express';
import bookingList from '../data/bookings.json';
import { Booking } from '../interfaces/booking.inerface';
import { asyncRequest } from '../services/getData.service';

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookingsList = await asyncRequest<Booking>({ data: bookingList as Booking[] });
    return res.status(200).json({ bookingsList });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookingsList = (await asyncRequest<Booking>({ data: bookingList as Booking[] })) as Booking[];
  try {
    const booking = bookingsList.find(booking => booking.guest.reservationID === id);
    if (!booking) return res.status(404).json({ message: `Booking with id ${id} not found` });

    res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
