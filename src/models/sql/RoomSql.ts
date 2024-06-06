import { DataTypes } from 'sequelize';
import dbSql from '../../config/sql';

export const RoomSql = dbSql.define('rooms', {
  _id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  roomImages: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  roomNumber: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  roomType: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  offer: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  offerPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

export const RoomAmenitiesSql = dbSql.define('amenities', {
  room_id: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    references: {
      model: RoomSql,
      key: '_id'
    }
  },
  amenity: {
    type: DataTypes.STRING(45),
    primaryKey: true
  }
});

RoomSql.hasMany(RoomAmenitiesSql, { foreignKey: 'room_id' });
