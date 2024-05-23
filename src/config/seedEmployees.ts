import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { EmployeeInterface } from '../interfaces/employee.interface';
const uri = process.env.MONGO_URI;
const seedDB = async () => {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('dashboard_api').collection('employees');

    await collection.drop();

    let employeesList: EmployeeInterface[] = [];

    for (let i = 0; i < 20; i++) {
      let employee: EmployeeInterface = {
        employee: {
          image: faker.image.avatar(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          employeeId: `E${faker.number.int({ min: 1, max: 100 })}`,
          startDate: faker.date.anytime().toISOString().slice(0, 10)
        },
        contact: {
          phone: faker.phone.number(),
          email: faker.internet.email()
        },
        description: faker.lorem.sentence({ min: 5, max: 10 }),
        status: faker.datatype.boolean()
      };

      employeesList.push(employee);
    }
    await collection.insertMany(employeesList);

    console.log('Database seeded! :)');
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
