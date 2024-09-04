import mongoose from 'mongoose';
import { RoomInterface } from '../interfaces/room';

const roomSchema = new mongoose.Schema<RoomInterface>(
  {
    roomNumber: { type: String, required: true },
    // id: { type: String, required: true }

    roomType: { type: String, required: true },
    description: { type: String, required: true },
    offer: { type: Boolean, required: true },
    offerPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    status: { type: Boolean, required: true },
    amenities: { type: [String], required: true }
  },
  { versionKey: false }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
