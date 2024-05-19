import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(mongoURI!);

    const url = `${db.connection.host}:${db.connection.port}`;

    console.log(`MongoDB conected in: ${url}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default conectarDB;
