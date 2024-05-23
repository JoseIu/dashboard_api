import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { catchedAsyc } from '../utils/catchedAsyc';
import responseCliente from '../utils/responseCliente';

const getAllContacts = async (req: Request, res: Response) => {
  const contactList = await Contact.find();

  return responseCliente(res, 200, contactList);
};

const getContactById = async (req: Request, res: Response) => {};

const createNewContact = async (req: Request, res: Response) => {};
const updateContact = async (req: Request, res: Response) => {};
const deleteContact = async (req: Request, res: Response) => {};

export default {
  getAllContacts: catchedAsyc(getAllContacts),
  getContactById: catchedAsyc(getContactById),
  createNewContact: catchedAsyc(createNewContact),
  updateContact: catchedAsyc(updateContact),
  deleteContact: catchedAsyc(deleteContact)
};
