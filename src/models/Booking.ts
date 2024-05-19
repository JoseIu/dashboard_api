import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
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
  specialRequest: String,
  roomType: String,
  status: String,
  guest: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    reserVationId: { type: String, required: true },
    img: { type: String, required: true }
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;