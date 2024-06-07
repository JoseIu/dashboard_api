import { Request, Response } from 'express';
import Room from '../models/Room';
import { RoomAmenitiesSql, RoomSql } from '../models/sql/RoomSql';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllRooms = async (req: Request, res: Response) => {
  // const roomsList = await Room.find();
  const roomsList = await RoomSql.findAll({
    include: [
      {
        model: RoomAmenitiesSql,
        attributes: ['amenity'].flatMap(amenity => amenity)
      }
    ]
  });

  return responseCliente(res, 200, roomsList);
};

const getRoomById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ClientError('Id is required', 400);
  const room = await RoomSql.findByPk(id, {
    include: [
      {
        model: RoomAmenitiesSql,
        attributes: ['amenity'].flatMap(amenity => amenity)
      }
    ]
  });

  if (!room) throw new ClientError(`Room with id ${id} not found`, 404);

  return responseCliente(res, 200, room);
};

const createNewRoom = async (req: Request, res: Response) => {
  try {
    const newRoom = RoomSql.build(req.body);
    return responseCliente(res, 200, newRoom);
  } catch (error) {
    throw new ClientError('Invalid room format', 400);
  }
};

const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roomToUpdate = await Room.findById(id);
  if (!roomToUpdate) throw new ClientError(`Room with id ${id} not found`, 404);
  await roomToUpdate.updateOne(req.body);
  return responseCliente(res, 200, 'Room updated');
};

const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roomToDelete = await Room.findById(id);
  if (!roomToDelete) throw new ClientError(`Room with id ${id} not found`, 404);
  await roomToDelete.deleteOne();
  return responseCliente(res, 200, 'Room deleted');
};
export default {
  getAllRooms: catchedAsyc(getAllRooms),
  getRoomById: catchedAsyc(getRoomById),
  createNewRoom: catchedAsyc(createNewRoom),
  updateRoom: catchedAsyc(updateRoom),
  deleteRoom: catchedAsyc(deleteRoom)
};
