import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(mongoURI!);

    const url = `${db.connection.host}:${db.connection.port}`;

    if (url) {
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default conectarDB;
