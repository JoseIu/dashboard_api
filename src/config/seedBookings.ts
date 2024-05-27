import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { BookingInterface } from '../interfaces/booking.inerface';
const uri = process.env.MONGO_URI;
const seedDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('bookings');

    await collection.drop();

    let bookingsList: BookingInterface[] = [];

    for (let i = 0; i < 20; i++) {
      const checkInDate = faker.date.anytime();
      const [dateIn, timeIn] = checkInDate.toISOString().split('T');
      const daysUntilCheckOut = faker.number.int({ min: 1, max: 14 });
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkInDate.getDate() + daysUntilCheckOut);
      const [dateOut, timeOut] = checkOutDate.toISOString().split('T');

      let booking: BookingInterface = {
        orderDate: faker.date.anytime().toISOString(),
        checkin: {
          date: dateIn,
          time: timeIn.slice(0, 5)
        },
        checkOut: {
          date: dateOut,
          time: timeOut.slice(0, 5)
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
