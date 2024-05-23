import 'dotenv/config';
import request from 'supertest';

import mongoose from 'mongoose';
import { describe } from 'node:test';
import expresApp from '../app';
beforeAll(async () => {
  // server.listen(4000);
  await mongoose.connect(process.env.MONGO_URI!);
});
describe('POST /login', () => {
  const userTes = {
    email: 'prueba@prueba.com',
    password: 'prueba'
  };

  test('should response a status code 200 if all is OK', async () => {
    const response = await request(expresApp)
      .post('/login')
      .send({ email: userTes.email, password: userTes.password });
    expect(response.status).toBe(200);
  });
  test('Should response with a Token if credential are correct', async () => {
    const response = await request(expresApp)
      .post('/login')
      .send({ email: userTes.email, password: userTes.password });
    expect(response.body).toMatchObject({
      error: false,
      data: {
        token: expect.any(String)
      }
    });
  });
  test('Should response with a staus code 400 if some credential are missing', async () => {
    const response = await request(expresApp).post('/login').send({ email: userTes.email });

    expect(response.status).toBe(400);
  });
  test('Should response with a error if some credential are missing', async () => {
    const response = await request(expresApp).post('/login').send({ email: userTes.email });
    console.log(response.body);

    expect(response.body).toMatchObject({
      error: true,
      message: expect.any(String)
    });
  });
});

afterAll(async () => {
  // server.close();
  await mongoose.disconnect();
});
