import { Request, Response } from 'express';
import bookingList from '../data/bookings.json';
import { Booking } from '../interfaces/booking.inerface';
import { asyncRequest } from '../services/getData.service';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllBookings = async (req: Request, res: Response) => {
  const bookingsList = await asyncRequest<Booking>({ data: bookingList as Booking[] });

  return responseCliente(res, 200, bookingsList);
};
const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bookingsList = (await asyncRequest<Booking>({ data: bookingList as Booking[] })) as Booking[];

  const booking = bookingsList.find(booking => booking.guest.reservationID === id);

  if (!booking) throw new ClientError(`Booking with id ${id} not found`, 404);

  return responseCliente(res, 200, booking);
};

export default {
  getAllBookings: catchedAsyc(getAllBookings),
  getBookingById: catchedAsyc(getBookingById)
};
