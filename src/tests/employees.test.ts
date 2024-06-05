import 'dotenv/config';
import request from 'supertest';

import mongoose from 'mongoose';
import { describe } from 'node:test';
import expresApp from '../app';
import { EmployeeInterface } from '../interfaces/employee.interface';
import Employee from '../models/Employee';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
});

describe('Get /employyes', () => {
  const token = process.env.TOKEN_TEST!;
  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp).get('/employees').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('Should response with a 401 status code if Unauthorized', async () => {
    const response = await request(expresApp).get('/employees');
    expect(response.status).toBe(401);
  });

  it('Should response with a obejest with all EMPLOYYES with a  message {error:false: data:[]} ', async () => {
    const response = await request(expresApp).get('/employees').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Array)
    });
  });
});

describe('Get /employee/:id', () => {
  const token = process.env.TOKEN_TEST;

  it('Should response with a booking searched by ID', async () => {
    const response = await request(expresApp).get('/employee/E95').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      error: false,
      data: expect.any(Object)
    });
    expect(response.body.data._id).toBeDefined();
  });
  it('Should response with a 404 status code if booking not found', async () => {
    const response = await request(expresApp).get('/employee/E95aa').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should response with a 400 for ID is required', async () => {
    const response = await request(expresApp).get('/employee/').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
});
describe('POST /employee', () => {
  const token = process.env.TOKEN_TEST!;

  const newEmployee: EmployeeInterface = {
    image: 'https://www.google.com',
    firstName: 'TEST',
    lastName: 'TEST',
    password: '123456',
    role: 'Manager',
    startDate: '2021-09-01',
    description: 'TEST-DESCRIPTION',

    phone: '1234567890',
    email: 'test@test.com',

    status: true
  };
  const wrongBooking = {
    image: 'https://www.google.com',
    firstName: 'TEST',
    lastName: 'TEST',
    password: '123456',

    startDate: '2021-09-01',
    description: 'TEST-DESCRIPTION',

    phone: '1234567890',
    email: 'test@test.com',

    status: true
  };

  it('Should response with a 200 status code', async () => {
    const response = await request(expresApp)
      .post('/employee')
      .send(newEmployee)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.firstName).toBe(newEmployee.firstName);
  });
  it('Should response with a 400 if newEmployee is wrong', async () => {
    const response = await request(expresApp)
      .post('/employee')
      .send(wrongBooking)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});

describe('PUT /employee/:id', () => {
  const token = process.env.TOKEN_TEST!;

  const newEmployee: EmployeeInterface = {
    image: 'https://www.google.com',
    firstName: 'TEST',
    lastName: 'TEST',
    password: '123456',
    role: 'Manager',
    startDate: '2021-09-01',
    description: 'TEST-DESCRIPTION',

    phone: '1234567890',
    email: 'test@test.com',

    status: true
  };
  const newEmployeeUpdate: EmployeeInterface = {
    image: 'https://www.google.com',
    firstName: 'TEST UDATED',
    lastName: 'TEST',
    password: '123456',
    role: 'Manager',
    startDate: '2021-09-01',
    description: 'TEST-DESCRIPTION',

    phone: '1234567890',
    email: 'test@test.com',

    status: true
  };
  let employee: any;
  beforeEach(async () => {
    employee = await Employee.create(newEmployee);
  });
  afterEach(async () => {
    await Employee.findByIdAndDelete(employee._id!);
  });
  it('Should update a booking', async () => {
    const response = await request(expresApp)
      .put(`/employee/${employee._id}`)
      .send(newEmployeeUpdate)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('json');
  });
});
describe('DELTE /employee/:id', () => {
  const newEmployee: EmployeeInterface = {
    image: 'https://www.google.com',
    firstName: 'TEST',
    lastName: 'TEST',
    password: '123456',
    role: 'Manager',
    startDate: '2021-09-01',
    description: 'TEST-DESCRIPTION',

    phone: '1234567890',
    email: 'test@test.com',

    status: true
  };
  const token = process.env.TOKEN_TEST!;
  let employee: any;
  let response: request.Response;
  beforeEach(async () => {
    employee = await Employee.create(newEmployee);
    response = await request(expresApp)
      .delete(`/employee/${employee._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  });
  it('Should response with a 200 status code', async () => {
    expect(response.status).toBe(200);

    const foundEmployee = await Employee.findById(employee._id!);

    expect(foundEmployee).toBeNull();
  });
});
afterAll(async () => {
  await Employee.deleteMany({ 'employee.firstName': 'TEST' });
  await mongoose.disconnect();
});
