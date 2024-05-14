import { Request, Response } from 'express';
import roomList from '../data/roomList.json';
import { Room } from '../interfaces/room';
import { asyncRequest } from '../services/getData.service';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllRooms = async (req: Request, res: Response) => {
  const rooms = await asyncRequest<Room>({ data: roomList });

  return responseCliente(res, 200, rooms);
};

const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = (await asyncRequest<Room>({ data: roomList })) as Room[];

  const room = response.find(room => room.room.id === id);

  if (!room) throw new ClientError(`Room with id ${id} not found`, 404);

  return responseCliente(res, 200, room);
};
export default {
  getAllRooms: catchedAsyc(getAllRooms),
  getRoomById: catchedAsyc(getRoomById)
};
