import mongoose, { Schema } from 'mongoose';

const contactShema = new Schema(
  {
    date: { type: String, required: true },
    messageID: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    arhived: { type: Boolean, required: true }
  },
  { versionKey: false }
);
const Contact = mongoose.model('Contact', contactShema);

export default Contact;
