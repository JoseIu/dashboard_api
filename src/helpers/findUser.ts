import users from '../data/users.json';

const findUser = (id: string, email: string): boolean => {
  const existUser = users.find(user => user.id === id && user.email === email);
  if (!existUser) throw new Error();

  return true;
};

export default findUser;
