import { Response } from 'express';

const responseCliente = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({
    error: false,
    data
  });
};

export default responseCliente;
