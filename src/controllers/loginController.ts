import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authByEmailPwd from '../helpers/authByEmailPwd';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const SECRET_KEY = process.env.SECRET_KEY;

const loginControlller = (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = authByEmailPwd(email, password);

    const token = jwt.sign({ id: existUser.id, email: existUser.email }, SECRET_KEY!, { expiresIn: 86400 });
    return responseCliente(res, 200, { token });
  } catch (error) {
    throw new ClientError('Invalid credentials', 401);
  }
};

export default {
  loginControlller: catchedAsyc(loginControlller)
};
