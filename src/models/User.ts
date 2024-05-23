import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  checkPWD(passwordForm: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPWD = async function (passwordForm: string) {
  return await bcrypt.compare(passwordForm, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
