import 'dotenv/config';
import express from 'express';
import bookingsRouter from './routes/bookings.routes';
import employeeRoutes from './routes/employee.routes';
import loginRoutes from './routes/login.routes';
import roomsRouter from './routes/rooms.routes';

const PORT = process.env.PORT || 3000;
const expresApp = express();

expresApp.use(express.json());
expresApp.use(express.text());
expresApp.use(roomsRouter);
expresApp.use(bookingsRouter);
expresApp.use(employeeRoutes);
expresApp.use(loginRoutes);

export default expresApp;
