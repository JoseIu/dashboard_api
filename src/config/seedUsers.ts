import { faker } from '@faker-js/faker';
import brypt from 'bcrypt';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { UserInterface } from '../interfaces/user.interface';
const uri = process.env.MONGO_URI;
const seedDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('users');

    await collection.drop();

    let usersList: UserInterface[] = [
      {
        name: faker.person.firstName(),
        email: 'prueba@prueba.com',
        password: brypt.hashSync('prueba', 10)
      },
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: brypt.hashSync('fakePassword', 10)
      },
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: brypt.hashSync('fakePassword', 10)
      },
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: brypt.hashSync('fakePassword', 10)
      }
    ];

    await collection.insertMany(usersList);

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
