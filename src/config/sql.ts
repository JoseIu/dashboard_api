import { Sequelize } from 'sequelize';

const dbSql = new Sequelize('hotel_miranda', 'root', 'root', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default dbSql;
