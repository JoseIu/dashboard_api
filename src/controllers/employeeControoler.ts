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

const createNewEmployee = async (req: Request, res: Response) => {
  try {
    const newEployee = new Employee(req.body);
    await newEployee.save();
    return responseCliente(res, 201, newEployee);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employeToEdit = await Employee.findById(id);

  if (!employeToEdit) throw new ClientError(`Employee with id ${id} not found`, 404);
  await employeToEdit.updateOne(req.body);
  return responseCliente(res, 200, 'Employee updated');
};

const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  const employeeToDelete = await Employee.findById(id);
  if (!employeeToDelete) throw new ClientError(`Employee with id ${id} not found`, 404);
  await employeeToDelete.deleteOne();

  return responseCliente(res, 200, 'Employee deleted');
};

export default {
  getAllEmployees: catchedAsyc(getAllEmployees),
  getEmployeeById: catchedAsyc(getEmployeeById),
  createNewEmployee: catchedAsyc(createNewEmployee),
  updateEmployee: catchedAsyc(updateEmployee),
  deleteEmployee: catchedAsyc(deleteEmployee)
};
