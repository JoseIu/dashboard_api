import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    room: {
      image: { type: String, required: true },
      number: { type: String, required: true },
      id: { type: String, required: true }
    },
    roomType: { type: String, required: true },
    amenities: { type: [String], required: true },
    price: { type: Number, required: true },
    offer: { type: Number, required: true },
    status: { type: Boolean, required: true }
  },
  { versionKey: false }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
