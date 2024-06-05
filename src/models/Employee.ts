import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
const employeeSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },

    description: { type: String, required: true },

    phone: { type: String, required: true },
    email: { type: String, required: true },

    status: { type: Boolean, required: true }
  },
  { versionKey: false }
);
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
