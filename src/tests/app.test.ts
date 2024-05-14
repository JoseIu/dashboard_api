import 'dotenv/config';
import request from 'supertest';
import app from '../app';

import bookings from '../data/bookings.json';

describe('Get /bookings', () => {
  const token = process.env.TOKEN_TEST;
  const data = bookings;
  test('Should response with a 200 status code', async () => {
    const response = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('Should response with a 401 status code, beacuse no token', async () => {
    const response = await request(app).get('/bookings');
    expect(response.status).toBe(401);
  });

  test('Should response with a obejest with a message {error:false: data:[]} ', async () => {
    const response = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);

    expect(response.body).toMatchObject({
      error: false,
      data
    });
  });
  test('Should response with a booking searched by ID', async () => {
    const response = await request(app).get('/booking/ABC123').set('Authorization', `Bearer ${token}`);
    const booking = bookings.find(booking => booking.guest.reservationID === 'ABC123');

    expect(response.body).toMatchObject({
      error: false,
      data: booking
    });
  });
  test('Should response with a status 404 and ', async () => {
    const response = await request(app).get('/booking/ABC1234').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
