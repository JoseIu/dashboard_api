import { Request, Response } from 'express';
import authByEmailPwd from '../helpers/authByEmailPwd';
export const loginControlller = (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existUser = authByEmailPwd(email, password);
    console.log(existUser);
    return res.status(200).json(existUser);
  } catch (error) {
    res.status(401).json({ message: 'User Unauthorized' });
  }
};
