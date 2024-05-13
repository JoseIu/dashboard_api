import express from 'express';
import { getAllRooms, getRoomById } from '../controllers/roomController';
import checkToken from '../middleware/checkToken';
const roomsRouter = express.Router();

roomsRouter.get('/rooms', checkToken, getAllRooms);
roomsRouter.get('/room/:id', checkToken, getRoomById);

export default roomsRouter;
