import { Request, Response } from 'express';
import roomList from '../data/roomList.json';
export const getAllRooms = (req: Request, res: Response) => {
  res.status(200).json(roomList);
};

export const getRoomsById = (req: Request, res: Response) => {
  const { id } = req.params;
  const room = roomList.find(room => room.room.id === id);

  if (!room) res.status(404).json({ message: `Room with id ${id} not found` });

  res.status(200).json(room);
};
