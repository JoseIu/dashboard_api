import { Request, Response } from 'express';
import Employee from '../models/Employee';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllEmployees = async (req: Request, res: Response) => {
  const employeeList = await Employee.find();

  return responseCliente(res, 200, employeeList);
};

const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw new ClientError('Id is required', 400);

  const employee = await Employee.findOne({ 'employee.employeeId': id });

  if (!employee) throw new ClientError(`Employee with ${id} not found`, 404);

  return responseCliente(res, 200, employee);
};

export default {
  getAllEmployees: catchedAsyc(getAllEmployees),
  getEmployeeById: catchedAsyc(getEmployeeById)
};
