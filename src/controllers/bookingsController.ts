import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BookingInterface } from '../interfaces/booking.inerface';
import Booking from '../models/Booking';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllBookings = async (req: Request, res: Response) => {
  const bookingsList: BookingInterface[] = await Booking.find();

  return responseCliente(res, 200, bookingsList);
};
const getBookingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ClientError('Id is required', 400);
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ClientError(`Invalid id: ${id}`, 400);

  const booking = await Booking.findOne({ _id: id });

  console.log(booking);

  if (!booking) throw new ClientError(`Booking with id ${id} not found`, 404);

  return responseCliente(res, 200, booking);
};

const createNewBooking = async (req: Request, res: Response) => {
  const newBooking = new Booking(req.body);
  const newBookingSaved = await newBooking.save();
  return responseCliente(res, 200, newBookingSaved);
};

const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) throw new ClientError(`Booking with id ${id} not found`, 404);

  await booking.updateOne(req.body);

  return responseCliente(res, 200, 'Booking updated');
};

const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) throw new ClientError(`Booking with id ${id} not found`, 404);

  await booking.deleteOne();
  return responseCliente(res, 200, 'Booking deleted');
};

export default {
  getAllBookings: catchedAsyc(getAllBookings),
  getBookingById: catchedAsyc(getBookingById),
  createNewBooking: catchedAsyc(createNewBooking),
  updateBooking: catchedAsyc(updateBooking),
  deleteBooking: catchedAsyc(deleteBooking)
};
