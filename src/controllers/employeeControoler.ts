import { Request, Response } from 'express';
import employeeList from '../data/employeeList.json';
import { Employee } from '../interfaces/employee.interface';
import { asyncRequest } from '../services/getData.service';
import { catchedAsyc } from '../utils/catchedAsyc';
import { ClientError } from '../utils/errorClient';
import responseCliente from '../utils/responseCliente';

const getAllEmployees = async (req: Request, res: Response) => {
  const response = await asyncRequest<Employee>({ data: employeeList });

  return responseCliente(res, 200, response);
};

const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = (await asyncRequest<Employee>({ data: employeeList })) as Employee[];

  const employee = response.find(employee => employee.employee.employeeId === id);
  if (!employee) throw new ClientError(`Employee with ${id} not found`, 404);

  return responseCliente(res, 200, employee);
};

export default {
  getAllEmployees: catchedAsyc(getAllEmployees),
  getEmployeeById: catchedAsyc(getEmployeeById)
};
