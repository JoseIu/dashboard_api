import cors from 'cors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import conectarDB from './config/db';
import bookingsRouter from './routes/bookings.routes';
import contactsRouter from './routes/contacts.routes';
import employeeRoutes from './routes/employee.routes';
import loginRoutes from './routes/login.routes';
import roomsRouter from './routes/rooms.routes';
import { ClientError } from './utils/errorClient';

const expresApp = express();
conectarDB();

const dominPermit = process.env.FRONT_URL?.split(',');
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) {
    if (!origin || dominPermit!.indexOf(origin) !== -1) return callback(null, true);
    else callback(new Error('No permitido por CORS'), false);
  }
};

expresApp.use(cors(corsOptions));
expresApp.use(express.json());
expresApp.use(express.text());
expresApp.use(roomsRouter);
expresApp.use(bookingsRouter);
expresApp.use(employeeRoutes);
expresApp.use(loginRoutes);
expresApp.use(contactsRouter);

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
