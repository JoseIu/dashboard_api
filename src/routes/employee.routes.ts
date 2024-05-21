import { Router } from 'express';
import employeeControoler from '../controllers/employeeControoler';

import checkToken from '../middleware/checkToken';

const employeeRoutes = Router();

employeeRoutes.get('/employees', checkToken, employeeControoler.getAllEmployees);
employeeRoutes.get('/employee/:id?', checkToken, employeeControoler.getEmployeeById);
employeeRoutes.post('/employee', checkToken, employeeControoler.createNewEmployee);
employeeRoutes.put('/employee/:id', checkToken, employeeControoler.updateEmployee);
employeeRoutes.delete('/employee/:id', checkToken, employeeControoler.deleteEmployee);

export default employeeRoutes;
