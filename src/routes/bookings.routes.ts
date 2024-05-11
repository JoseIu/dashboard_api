import { Router } from 'express';
import { getAllBookings, getBookingById } from '../controllers/bookingsController';

const bookingsRouter = Router();

bookingsRouter.get('/bookings', getAllBookings);
bookingsRouter.get('/booking/:id', getBookingById);

export default bookingsRouter;
