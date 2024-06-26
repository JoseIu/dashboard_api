import { Response } from 'express';

const responseCliente = (res: Response, statusCode: number, data?: any, message?: string) => {
  if (message) {
    res.status(statusCode).json({
      error: false,
      message
    });
  } else {
    res.status(statusCode).json({
      error: false,
      data
    });
  }
};

export default responseCliente;
