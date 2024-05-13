import { Request, Response } from 'express';
import roomList from '../data/roomList.json';
import { Room } from '../interfaces/room';
import { asyncRequest } from '../services/getData.service';

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await asyncRequest<Room>({ data: roomList });

    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = (await asyncRequest<Room>({ data: roomList })) as Room[];

  try {
    const room = response.find(room => room.room.id === id);

    if (!room) res.status(404).json({ message: `Room with id ${id} not found` });

    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
