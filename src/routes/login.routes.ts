import { Router } from 'express';
import loginControlller from '../controllers/loginController';
import loginDTO from '../dto/login.dto';

const loginRoutes = Router();

loginRoutes.post('/login', loginDTO, loginControlller.loginControlller);

export default loginRoutes;
