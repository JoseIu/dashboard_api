import { Request, Response } from 'express';
import Room from '../models/Room';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllRooms = async (req: Request, res: Response) => {
  const roomsList = await Room.find();

  return responseCliente(res, 200, roomsList);
};

const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ClientError('Id is required', 400);
  const room = await Room.findOne({ 'room.id': id });

  if (!room) throw new ClientError(`Room with id ${id} not found`, 404);

  return responseCliente(res, 200, room);
};
export default {
  getAllRooms: catchedAsyc(getAllRooms),
  getRoomById: catchedAsyc(getRoomById)
};
