import { Router } from 'express';

import bookingController from '../controllers/bookingsController';
import createNewBookingDTO from '../dto/createNewBooking.dto';
import checkToken from '../middleware/checkToken';

const bookingsRouter = Router();

bookingsRouter.get('/bookings', checkToken, bookingController.getAllBookings);
bookingsRouter.get('/booking/:id?', checkToken, bookingController.getBookingById);

bookingsRouter.post('/booking', checkToken, createNewBookingDTO, bookingController.createNewBooking);

bookingsRouter.put('/booking/:id?', checkToken, bookingController.updateBooking);
bookingsRouter.delete('/booking/:id?', checkToken, bookingController.deleteBooking);

export default bookingsRouter;
