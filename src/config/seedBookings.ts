import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { Booking } from '../interfaces/booking.inerface';
const uri = process.env.MONGO_URI;
const seedDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('bookings');

    await collection.drop();

    let bookingsList: Booking[] = [];

    for (let i = 0; i < 20; i++) {
      let booking: Booking = {
        orderDate: faker.date.anytime().toString(),
        checkin: {
          date: faker.date.anytime().toISOString().slice(0, 10),
          time: new Date(faker.date.future().toISOString()).toLocaleTimeString('en-US', { hour12: true })
        },
        checkOut: {
          date: faker.date.anytime().toISOString().slice(0, 10),
          time: new Date(faker.date.future().toISOString()).toLocaleTimeString('en-US', { hour12: true })
        },
        specialRequest: faker.lorem.sentence({ min: 5, max: 10 }),
        roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
        status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
        guest: {
          name: faker.person.firstName(),
          lastName: faker.person.lastName(),
          reservationID: `AB${faker.number.int({ min: 1, max: 10 })}`,
          img: faker.image.avatar()
        }
      };
      bookingsList.push(booking);
    }
    await collection.insertMany(bookingsList);

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
