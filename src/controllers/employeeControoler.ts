import { Request, Response } from 'express';
import employeeList from '../data/employeeList.json';
import { Employee } from '../interfaces/employee.interface';
import { asyncRequest } from '../services/getData.service';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const response = await asyncRequest<Employee>({ data: employeeList });

    return res.status(200).json({ employeeList: response });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = (await asyncRequest<Employee>({ data: employeeList })) as Employee[];

  try {
    const employee = response.find(employee => employee.employee.employeeId === id);

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
