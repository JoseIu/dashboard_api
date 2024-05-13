import { Router } from 'express';
import { getAllEmployees, getEmployeeById } from '../controllers/employeeControoler';
import checkToken from '../middleware/checkToken';

const employeeRoutes = Router();

employeeRoutes.get('/employees', checkToken, getAllEmployees);
employeeRoutes.get('/employee/:id', checkToken, getEmployeeById);

export default employeeRoutes;
