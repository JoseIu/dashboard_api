import 'dotenv/config';
import express from 'express';
import roomsRouter from './routes/rooms.routes';

const PORT = process.env.PORT || 3000;
const expresApp = express();

expresApp.use(express.json());
expresApp.use(express.text());
expresApp.use(roomsRouter);

expresApp.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
