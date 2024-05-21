import { Response } from 'express';

const responseCliente = (res: Response, statusCode: number, data?: any, message?: string) => {
  if (message) {
    return res.status(statusCode).json({
      error: false,
      message
    });
  }
  return res.status(statusCode).json({
    error: false,
    data
  });
};

export default responseCliente;
