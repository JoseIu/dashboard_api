import users from '../data/users.json';
import { User } from '../interfaces/user.interface';

const authByEmailPwd = (email: string, password: string): User => {
  const existUser = users.find(user => user.email === email);

  if (!existUser) throw new Error();
  if (existUser.password !== password) throw new Error();

  return existUser;
};

export default authByEmailPwd;
