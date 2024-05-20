import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import conectarDB from './config/db';
import bookingsRouter from './routes/bookings.routes';
import employeeRoutes from './routes/employee.routes';
import loginRoutes from './routes/login.routes';
import roomsRouter from './routes/rooms.routes';
import { ClientError } from './utils/errorClient';

const PORT = process.env.PORT || 3000;
const expresApp = express();
conectarDB();

expresApp.use(express.json());
expresApp.use(express.text());
expresApp.use(roomsRouter);
expresApp.use(bookingsRouter);
expresApp.use(employeeRoutes);
expresApp.use(loginRoutes);

// setupSwagger(expresApp);
expresApp.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if ('statusCode' in err) {
    res.status((err as ClientError).statusCode).json({
      error: true,
      message: err.message
    });
  } else {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});

export default expresApp;
