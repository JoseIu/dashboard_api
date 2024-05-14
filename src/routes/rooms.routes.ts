import express from 'express';
import roomController from '../controllers/roomController';
import checkToken from '../middleware/checkToken';
const roomsRouter = express.Router();

roomsRouter.get('/rooms', checkToken, roomController.getAllRooms);
roomsRouter.get('/room/:id', checkToken, roomController.getRoomById);

export default roomsRouter;
