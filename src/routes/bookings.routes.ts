import { Router } from 'express';

import bookingController from '../controllers/bookingsController';
import checkToken from '../middleware/checkToken';

const bookingsRouter = Router();

bookingsRouter.get('/bookings', checkToken, bookingController.getAllBookings);
bookingsRouter.get('/booking/:id', checkToken, bookingController.getBookingById);

export default bookingsRouter;
