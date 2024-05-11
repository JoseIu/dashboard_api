import users from '../data/users.json';
import { User } from '../interfaces/user.interface';

const authByEmailPwd = (email: string, password: string): User => {
  const existUser = users.find(user => user.email === email && user.password === password);

  if (!existUser) throw new Error();

  return existUser;
};

export default authByEmailPwd;
