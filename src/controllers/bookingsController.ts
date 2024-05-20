import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllBookings = async (req: Request, res: Response) => {
  const bookingsList = await Booking.find();

  return responseCliente(res, 200, bookingsList);
};
const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ClientError('Id is required', 400);

  const booking = await Booking.findOne({ _id: id });

  if (!booking) throw new ClientError(`Booking with id ${id} not found`, 404);

  return responseCliente(res, 200, booking);
};

export default {
  getAllBookings: catchedAsyc(getAllBookings),
  getBookingById: catchedAsyc(getBookingById)
};
