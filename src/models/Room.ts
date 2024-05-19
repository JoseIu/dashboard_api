import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  room: {
    image: { type: String, trim: true },
    number: { type: String, trim: true },
    id: { type: String, trim: true }
  },
  roomType: { type: String, trim: true },
  amenities: [String],
  price: Number,
  offer: Number,
  status: Boolean
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
