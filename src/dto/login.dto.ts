import Ajv, { JSONSchemaType } from 'ajv';
import addErros from 'ajv-errors';
import addFormas from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';

interface LoginTDO {
  email: string;
  password: string;
}
const logigTDOSchema: JSONSchemaType<LoginTDO> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        format: 'Email is invalid, must be a string',
        type: 'Email is invalid, must be a email valid format'
      }
    },
    password: {
      type: 'string',
      errorMessage: {
        type: 'Password is not invalid must be a string'
      }
    }
  },
  required: ['email', 'password'],
  additionalProperties: false
};

const ajv = new Ajv({ allErrors: true });
addFormas(ajv, ['email']);
addErros(ajv);
const validateSchema = ajv.compile(logigTDOSchema);

const loginDTO = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = validateSchema(req.body);
  console.log(validateSchema.errors);

  if (!isDTOValid) return res.status(400).json(validateSchema.errors?.map(error => error.message));
  next();
};

export default loginDTO;
