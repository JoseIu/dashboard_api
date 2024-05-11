import { Router } from 'express';
import { getAllEmployees, getEmployeeById } from '../controllers/employeeControoler';

const employeeRoutes = Router();

employeeRoutes.get('/employees', getAllEmployees);
employeeRoutes.get('/employee/:id', getEmployeeById);

export default employeeRoutes;
