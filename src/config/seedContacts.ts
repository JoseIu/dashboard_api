import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

import { ContactMessage } from '../interfaces/contact.interface';

const uri = process.env.MONGO_URI;

const seeDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();

    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('contacts');
    await collection.drop();

    let contactsList: ContactMessage[] = [];

    for (let i = 0; i < 20; i++) {
      const contact: ContactMessage = {
        date: faker.date.anytime().toISOString().slice(0, 10),
        messageID: faker.string.uuid(),
        customer: {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          phone: faker.phone.number()
        },
        subject: faker.lorem.sentence({ min: 5, max: 10 }),
        comment: faker.lorem.sentence({ min: 10, max: 20 }),
        arhived: faker.datatype.boolean()
      };
      contactsList.push(contact);
    }
    await collection.insertMany(contactsList);
    console.log('Database seeded! 🚀');
    await client.close();
  } catch (error) {
    console.log(error);
  }
};

seeDB();
