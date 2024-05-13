import { Router } from 'express';
import { getAllBookings, getBookingById } from '../controllers/bookingsController';
import checkToken from '../middleware/checkToken';

const bookingsRouter = Router();

bookingsRouter.get('/bookings', checkToken, getAllBookings);
bookingsRouter.get('/booking/:id', checkToken, getBookingById);

export default bookingsRouter;
