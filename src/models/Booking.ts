import mongoose from 'mongoose';
import { BookingInterface } from '../interfaces/booking.inerface';

const bookingSchema = new mongoose.Schema<BookingInterface>(
  {
    guest: {
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      reservationID: { type: String, required: true },
      img: { type: String, required: true }
    },
    orderDate: {
      type: String,
      required: true
    },
    checkin: {
      date: { type: Date, required: true },
      time: { type: String, required: true }
    },
    checkOut: {
      date: { type: Date, required: true },
      time: { type: String, required: true }
    },
    roomType: String,
    roomNumber: String,
    roomID: String,
    specialRequest: String,
    status: String
  },
  { versionKey: false }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
