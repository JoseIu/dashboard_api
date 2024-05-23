import 'dotenv/config';
import request from 'supertest';

import mongoose from 'mongoose';
import { describe } from 'node:test';
import expresApp from '../app';
import { BookingInterface } from '../interfaces/booking.inerface';
import Booking from '../models/Booking';

beforeAll(async () => {
  // server.listen(4000);
  await mongoose.connect(process.env.MONGO_URI!);
});

describe('Get /bookings', () => {
  const token = process.env.TOKEN_TEST!;
  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Should response with a 401 status code if Unauthorized', async () => {
    const response = await request(expresApp).get('/bookings');
    expect(response.status).toBe(401);
  });

  it('Should response with a obejest with all BOOKINGS with a  message {error:false: data:[]} ', async () => {
    const response = await request(expresApp).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Array)
    });
  });
});

describe('Get /booking/:id', () => {
  const token = process.env.TOKEN_TEST;

  it('Should response with a booking searched by ID', async () => {
    const response = await request(expresApp)
      .get('/booking/664c831e6de60bbb7ef91904')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Object)
    });
  });
  it('Should response with a 404 status code if booking not found', async () => {
    const response = await request(expresApp)
      .get('/booking/664c831e6de60bbb7ef91AAA')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should response with a 400 for invalid MONGODB ID', async () => {
    const response = await request(expresApp)
      .get('/booking/664c831e6de60bbb7')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});

describe('POST /booking', () => {
  const token = process.env.TOKEN_TEST!;

  const newBooking: BookingInterface = {
    orderDate: '2021-09-01',
    checkin: {
      date: '2021-09-01',
      time: '12:00'
    },
    checkOut: {
      date: '2021-09-01',
      time: '12:00'
    },
    specialRequest: 'No special requests',
    roomType: 'Single',
    guest: {
      name: 'TEST',
      lastName: 'TEST',
      reserVationId: '1234567890',
      img: 'https://www.google.com'
    },
    status: 'In Progress'
  };
  const wrongBooking = {
    checkin: {
      date: '2021-09-01',
      time: '12:00'
    },
    checkOut: {
      date: '2021-09-01',
      time: '12:00'
    },
    specialRequest: 'No special requests',
    roomType: 'Single',
    guest: {
      name: 'TEST',
      lastName: 'TEST',
      reserVationId: '1234567890',
      img: 'https://www.google.com'
    }
  };

  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp)
      .post('/booking')
      .send(newBooking)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.guest.name).toBe(newBooking.guest.name);
  });
  it('Should response with a 400 if newBooking is wrong', async () => {
    const response = await request(expresApp)
      .post('/booking')
      .send(wrongBooking)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
describe('PUT /booking/:id', () => {
  const token = process.env.TOKEN_TEST!;

  const newBooking = {
    orderDate: '2021-09-01',
    checkin: {
      date: '2021-09-01',
      time: '12:00'
    },
    checkOut: {
      date: '2021-09-01',
      time: '12:00'
    },
    specialRequest: 'No special requests',
    roomType: 'Single',
    guest: {
      name: 'TEST-PUT',
      lastName: 'TEST-PUT',
      reserVationId: '1234567890',
      img: 'https://www.google.com'
    },
    status: 'In Progress'
  };
  let booking: any;
  beforeEach(async () => {
    booking = await Booking.create(newBooking);
  });
  afterEach(async () => {
    await Booking.findByIdAndDelete(booking._id!);
  });
  it('Should update a booking', async () => {
    const response = await request(expresApp)
      .put(`/booking/${booking._id}`)
      .send(newBooking)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('json');
  });
});

describe('DELTE /booking/:id', () => {
  const newBooking = {
    orderDate: '2021-09-01',
    checkin: {
      date: '2021-09-01',
      time: '12:00'
    },
    checkOut: {
      date: '2021-09-01',
      time: '12:00'
    },
    specialRequest: 'No special requests',
    roomType: 'Single',
    guest: {
      name: 'TEST-DELETE',
      lastName: 'TEST-DELETE',
      reserVationId: '1234567890',
      img: 'https://www.google.com'
    },
    status: 'In Progress'
  };
  const token = process.env.TOKEN_TEST!;
  let booking: any;
  let response: request.Response;
  beforeEach(async () => {
    booking = await Booking.create(newBooking);
    response = await request(expresApp)
      .delete(`/booking/${booking._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  });
  it('Should response with a 200 status code', async () => {
    expect(response.status).toBe(200);

    const foundBooking = await Booking.findById(booking._id);

    expect(foundBooking).toBeNull();
  });
});

afterAll(async () => {
  // server.close();
  await Booking.deleteMany({ 'guest.name': 'TEST' });
  await mongoose.disconnect();
});
