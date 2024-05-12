import { Router } from 'express';
import loginDTO from '../dto/login.dto';

const loginRoutes = Router();

loginRoutes.post('/login', loginDTO, (req, res) => {
  res.send('Login');
});

export default loginRoutes;
