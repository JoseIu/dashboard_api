import Ajv, { JSONSchemaType } from 'ajv';
import addErros from 'ajv-errors';
import addFormas from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import { BookingInterface } from '../interfaces/booking.inerface';
import { ClientError } from '../utils/errorClient';

const createNewBookingDTOSchema: JSONSchemaType<BookingInterface> = {
  type: 'object',
  properties: {
    guest: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
        reservationID: { type: 'string' },
        img: { type: 'string' }
      },
      errorMessage: {
        type: 'Invalid type, must be a string'
      },
      required: ['name', 'lastName', 'reservationID', 'img']
    },
    orderDate: { type: 'string', format: 'date' },
    checkin: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date' },
        time: { type: 'string' }
      },
      errorMessage: {
        format: 'Checkin date is invalid, must be a date valid format',
        type: 'Checkin date is invalid, must be a string'
      },
      required: ['date', 'time']
    },
    checkOut: {
      type: 'object',
      properties: {
        date: { type: 'string', format: 'date' },
        time: { type: 'string' }
      },
      errorMessage: {
        format: 'Checkin date is invalid, must be a date valid format',
        type: 'Checkin date is invalid, must be a string'
      },
      required: ['date', 'time']
    },
    specialRequest: { type: 'string' },
    roomType: { type: 'string' },
    roomNumber: { type: 'string' },
    roomID: { type: 'string' },
    status: { type: 'string', enum: ['Check In', 'Check Out', 'In Progress'] }
  },
  required: ['orderDate', 'checkin', 'checkOut', 'roomType', 'status', 'guest'],
  additionalProperties: false
};

const ajv = new Ajv({ allErrors: true });
addFormas(ajv, ['date']);
addErros(ajv);
const validateSchema = ajv.compile(createNewBookingDTOSchema);

const createNewBookingDTO = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = validateSchema(req.body);

  const messageError = validateSchema.errors?.map(error => error.message).join(', ');
  if (!isDTOValid) throw new ClientError(messageError!, 400);
  next();
};

export default createNewBookingDTO;
