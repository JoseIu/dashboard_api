import { Router } from 'express';

import bookingController from '../controllers/bookingsController';
import createNewBookingDTO from '../dto/createNewBooking.dto';
import checkToken from '../middleware/checkToken';

const bookingsRouter = Router();

bookingsRouter.get('/bookings', checkToken, bookingController.getAllBookings);
bookingsRouter.get('/booking/:id?', checkToken, bookingController.getBookingById);

bookingsRouter.post('/booking/add-booking', checkToken, createNewBookingDTO, bookingController.createNewBooking);

bookingsRouter.put('/booking/update-booking/:id?', checkToken, bookingController.updateBooking);
bookingsRouter.delete('/booking/delete-booking/:id?', checkToken, bookingController.deleteBooking);

export default bookingsRouter;
