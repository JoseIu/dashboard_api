import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { Room } from '../interfaces/room';
const uri = process.env.MONGO_URI;
const seedDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('rooms');

    await collection.drop();

    let roomsList: Room[] = [];

    for (let i = 0; i < 20; i++) {
      let room = {
        room: {
          image: faker.image.avatar(),
          number: faker.number.int({ min: 1, max: 100 }).toString(),
          id: `R${faker.number.int({ min: 1, max: 100 })}`
        },
        roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
        amenities: faker.helpers.arrayElements(
          ['WiFi', 'TV', 'Air Conditioning', 'Safe', 'Coffee Maker'],
          faker.number.int({ min: 1, max: 5 })
        ),
        price: parseFloat(faker.number.float({ min: 100, max: 1000 }).toFixed(2)),
        offer: faker.number.int({ min: 0, max: 100 }),
        status: faker.datatype.boolean()
      };
      roomsList.push(room);
    }
    await collection.insertMany(roomsList);

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
