import express from 'express';
import { getAllRooms, getRoomsById } from '../controllers/roomController';
import checkToken from '../middleware/checkToken';
const roomsRouter = express.Router();

roomsRouter.get('/rooms', checkToken, getAllRooms);
roomsRouter.get('/room/:id', checkToken, getRoomsById);

export default roomsRouter;
