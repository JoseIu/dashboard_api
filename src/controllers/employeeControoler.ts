import { Request, Response } from 'express';
import employeeList from '../data/employeeList.json';
export const getAllEmployees = (req: Request, res: Response) => {
  res.status(200).json(employeeList);
};
export const getEmployeeById = (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = employeeList.find(({ employee }) => employee.employeeId === id);

  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  res.status(200).json(employee);
};
