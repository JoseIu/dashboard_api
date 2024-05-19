import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employee: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employeeId: { type: String, required: true },
    startDate: { type: Date, required: true },
    image: { type: String, required: true }
  },
  description: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  status: { type: Boolean, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
