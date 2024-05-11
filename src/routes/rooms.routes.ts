import express from 'express';
import { getAllRooms, getRoomsById } from '../controllers/roomController';
const roomsRouter = express.Router();

roomsRouter.get('/rooms', getAllRooms);
roomsRouter.get('/room/:id', getRoomsById);

export default roomsRouter;
