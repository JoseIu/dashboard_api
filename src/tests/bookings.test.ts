import 'dotenv/config';
import request from 'supertest';
import app from '../app';

import mongoose from 'mongoose';
import server from '../server';
// import Booking from '../models/Booking';
// import employeeList from '../data/employeeList.json';
// import roomList from '../data/roomList.json';
// import users from '../data/users.json';
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

describe('Get /bookings', () => {
  const token = process.env.TOKEN_TEST;

  test('Should response with a 200 status code', async () => {
    const response = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('Should response with a 401 status code if Unauthorized', async () => {
    const response = await request(app).get('/bookings');
    expect(response.status).toBe(401);
  });

  test('Should response with a obejest with all BOOKINGS with a  message {error:false: data:[]} ', async () => {
    const response = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Array)
    });
  });
});
afterAll(async () => {
  server.close();
  await mongoose.disconnect();
});
