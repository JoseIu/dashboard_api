import 'dotenv/config';
import request from 'supertest';
import app from '../app';
import server from '../server';

import bookings from '../data/bookings.json';
import employeeList from '../data/employeeList.json';
import roomList from '../data/roomList.json';
import users from '../data/users.json';

describe('Get /bookings', () => {
  const token = process.env.TOKEN_TEST;
  const data = bookings;
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
  test('Should response with a status 404 if room not with ID not esist ', async () => {
    const response = await request(app).get('/booking/ABC1234').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

describe('Get /rooms', () => {
  const token = process.env.TOKEN_TEST;
  const rooms = roomList;
  test('Should return with a 200 status code', async () => {
    const response = await request(app).get('/rooms').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  test('Should return a 401 status code if Unauthorized', async () => {
    const response = await request(app).get('/rooms');
    expect(response.status).toBe(401);
  });

  test('should return a obejt with all ROOMS with a message {error:false: data:[]}', async () => {
    const response = await request(app).get('/rooms').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: rooms
    });
  });

  test('Should return a status code 404, if room wiht ID not exist', async () => {
    const response = await request(app).get('/room/R1012').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
  test('Should return a response with a Room searched by ID', async () => {
    const response = await request(app).get('/room/R101').set('Authorization', `Bearer ${token}`);
    const room = rooms.find(room => room.room.id === 'R101');
    expect(response.body).toMatchObject({
      error: false,
      data: room
    });
  });
});

describe('GET /employees', () => {
  const token = process.env.TOKEN_TEST;
  const data = employeeList;

  test('Should response with a 200 status code', async () => {
    const response = await request(app).get('/employees').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  test('Should response with a 401, status code if Unauthorized', async () => {
    const response = await request(app).get('/employees');

    expect(response.status).toBe(401);
  });

  test('Should response with all EMPLOYYE with a message {error:false: data:[]}', async () => {
    const response = await request(app).get('/employees').set('Authorization', `Bearer ${token}`);

    expect(response.body).toMatchObject({
      error: false,
      data
    });
  });

  test('Should return with an employee searched by ID', async () => {
    const response = await request(app).get('/employee/EMP001').set('Authorization', `Bearer ${token}`);
    const employee = employeeList.find(employee => employee.employee.employeeId === 'EMP001');

    expect(response.body).toMatchObject({
      error: false,
      data: employee
    });
  });
  test('Should return with a 404 status code if employee with ID not exist', async () => {
    const response = await request(app).get('/employee/EMP0012').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe('POST /login', () => {
  const usersList = users;
  const userTes = usersList[0];

  test('should response a status code 200 if all is OK', async () => {
    const response = await request(app).post('/login').send({ email: userTes.email, password: userTes.password });
    expect(response.status).toBe(200);
  });
  test('Should response with a Token if credential are correct', async () => {
    const response = await request(app).post('/login').send({ email: userTes.email, password: userTes.password });
    expect(response.body).toMatchObject({
      error: false,
      data: {
        token: expect.any(String)
      }
    });
  });
  test('Should response with a staus code 400 if some credential are missing', async () => {
    const response = await request(app).post('/login').send({ email: userTes.email });

    expect(response.status).toBe(400);
  });
  test('Should response with a error if some credential are missing', async () => {
    const response = await request(app).post('/login').send({ email: userTes.email });
    console.log(response.body);

    expect(response.body).toEqual([expect.any(String)]);
  });
});

afterAll(() => {
  server.close();
});
