import 'dotenv/config';
import request from 'supertest';

import mongoose from 'mongoose';
import { describe } from 'node:test';
import expresApp from '../app';
import { RoomInterface } from '../interfaces/room';
import Room from '../models/Room';

beforeAll(async () => {
  // server.listen(4000);
  await mongoose.connect(process.env.MONGO_URI!);
});

describe('Get /rooms', () => {
  const token = process.env.TOKEN_TEST!;
  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp).get('/bookings').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Should response with a 401 status code if Unauthorized', async () => {
    const response = await request(expresApp).get('/rooms');
    expect(response.status).toBe(401);
  });

  it('Should response with a obejest with all BOOKINGS with a  message {error:false: data:[]} ', async () => {
    const response = await request(expresApp).get('/rooms').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Array)
    });
  });
});

describe('Get /room/:id', () => {
  const token = process.env.TOKEN_TEST;

  it('Should response with a booking searched by ID', async () => {
    const response = await request(expresApp).get('/room/R63').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Object)
    });
  });
  it('Should response with a 404 status code if booking not found', async () => {
    const response = await request(expresApp).get('/room/R63aa').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should response with a 400 for invalid MONGODB ID', async () => {
    const response = await request(expresApp).get('/room/').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});

describe('POST /room', () => {
  const token = process.env.TOKEN_TEST!;

  const newRoom: RoomInterface = {
    room: {
      image: 'https://www.google.com',
      number: 'RR63',
      id: 'TGFR63'
    },
    amenities: ['TV', 'AC', 'WiFi'],
    roomType: 'Single',
    price: 100,
    offer: 0,
    status: true
  };
  const wrongRoom = {
    room: {
      image: 'https://www.google.com',
      number: 'RR63',
      id: 'TGFR63'
    },
    amenities: ['TV', 'AC', 'WiFi'],
    roomType: 'Single',
    price: 100
  };

  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp).post('/room').send(newRoom).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.room.id).toBe(newRoom.room.id);
  });
  it('Should response with a 400 if newBooking is wrong', async () => {
    const response = await request(expresApp)
      .post('/room')
      .send(wrongRoom)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});

describe('PUT /room/:id', () => {
  const token = process.env.TOKEN_TEST!;

  const newRoom: RoomInterface = {
    room: {
      image: 'https://www.google.com',
      number: 'RR63',
      id: 'TGFR63'
    },
    amenities: ['TV', 'AC', 'WiFi'],
    roomType: 'Single',
    price: 100,
    offer: 0,
    status: true
  };
  const roomUpdate = {
    room: {
      image: 'https://www.google.com',
      number: 'RR63',
      id: 'TGFR63'
    },
    amenities: ['TV', 'AC', 'WiFi'],
    roomType: 'Double Bed',
    price: 100,
    offer: 0,
    status: true
  };
  let room: any;
  beforeEach(async () => {
    room = await Room.create(newRoom);
  });
  afterEach(async () => {
    await Room.findByIdAndDelete(room._id!);
  });
  it('Should update a room', async () => {
    const response = await request(expresApp)
      .put(`/room/${room._id}`)
      .send(roomUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('json');
  });
});

describe('DELTE /room/:id', () => {
  const newRoom: RoomInterface = {
    room: {
      image: 'https://www.google.com',
      number: 'RR63',
      id: 'TGFR63'
    },
    amenities: ['TV', 'AC', 'WiFi'],
    roomType: 'Single',
    price: 100,
    offer: 0,
    status: true
  };
  const token = process.env.TOKEN_TEST!;
  let room: any;
  let response: request.Response;
  beforeEach(async () => {
    room = await Room.create(newRoom);
    response = await request(expresApp).delete(`/room/${room._id}`).set('Authorization', `Bearer ${token}`).send();
  });
  it('Should response with a 200 status code', async () => {
    expect(response.status).toBe(200);

    const foundRoom = await Room.findById(room._id);

    expect(foundRoom).toBeNull();
  });
});

afterAll(async () => {
  // server.close();
  await Room.deleteMany({ 'room.id': 'TGFR63' });
  await mongoose.disconnect();
});
