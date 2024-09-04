import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { BookingInterface } from '../interfaces/booking.inerface';
import { RoomInterface } from '../interfaces/room';
import Room from '../models/Room';

const uri = process.env.MONGO_URI!;

const seedDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Mongoose connected to MongoDB');

    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log('Connected correctly to server');

      const roomsList: RoomInterface[] = await Room.find();
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
        const randomRoom = faker.helpers.arrayElement(roomsList);
        let booking: BookingInterface = {
          guest: {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            reservationID: `AB${faker.number.int({ min: 1, max: 10 })}`,
            img: faker.image.url()
          },
          orderDate: faker.date.anytime().toISOString(),
          checkin: {
            date: dateIn,
            time: timeIn.slice(0, 5)
          },
          checkOut: {
            date: dateOut,
            time: timeOut.slice(0, 5)
          },
          roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
          roomNumber: randomRoom.roomNumber,
          roomID: randomRoom._id!,
          specialRequest: faker.lorem.sentence({ min: 5, max: 10 }),
          status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress'])
        };
        bookingsList.push(booking);
      }
      await collection.insertMany(bookingsList);

      console.log('Database seeded! :)');
      await client.close();
    } catch (err) {
      console.log(err);
    } finally {
      await mongoose.connection.close();
    }
  } catch (err) {
    console.log('Mongoose connection error:', err);
  }
};

seedDB();
