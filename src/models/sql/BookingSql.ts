import { DataTypes } from 'sequelize';
import dbSql from '../../config/sql';
import { RoomSql } from './RoomSql';

export const BookingSql = dbSql.define('bookings', {
  _id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true
  },
  guestName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guestLastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reservationID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guestImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  checkin: {
    type: DataTypes.TIME,
    allowNull: false
  },

  checkOut: {
    type: DataTypes.TIME,
    allowNull: false
  },
  roomType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roomID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialRequest: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
BookingSql.belongsTo(RoomSql, { foreignKey: 'roomID', targetKey: '_id' });
