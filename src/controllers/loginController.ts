import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const SECRET_KEY = process.env.SECRET_KEY;

const loginControlller = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ClientError('User not found', 404);

  //check Password
  if ((await user.checkPWD(password)) === false) throw new ClientError('Invalid Password', 400);

  //generate token and send it
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY!, { expiresIn: 86400 });
  return responseCliente(res, 200, { token });
};

export default {
  loginControlller: catchedAsyc(loginControlller)
};
