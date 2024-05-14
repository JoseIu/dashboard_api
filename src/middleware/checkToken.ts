import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import findUser from '../helpers/findUser';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer'))
    return res.status(401).json({ message: 'Token no valid' });

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY!) as TokenPayload;
    const { email, id } = decoded;
    const verifyUser = findUser(id, email);
    if (verifyUser) return next();
  } catch (error) {
    return res.status(401).json({ message: 'User not found' });
  }
};

export default checkToken;
