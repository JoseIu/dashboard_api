import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authByEmailPwd from '../helpers/authByEmailPwd';

const SECRET_KEY = process.env.SECRET_KEY;
export const loginControlller = (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = authByEmailPwd(email, password);

    const token = jwt.sign({ id: existUser.id, email: existUser.email }, SECRET_KEY!, { expiresIn: 86400 });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Incorrect credentials' });
  }
};
