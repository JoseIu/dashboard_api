import { Router } from 'express';
import employeeControoler from '../controllers/employeeControoler';

import checkToken from '../middleware/checkToken';

const employeeRoutes = Router();

employeeRoutes.get('/employees', checkToken, employeeControoler.getAllEmployees);
employeeRoutes.get('/employee/:id?', checkToken, employeeControoler.getEmployeeById);

export default employeeRoutes;
