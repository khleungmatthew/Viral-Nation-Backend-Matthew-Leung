import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import Review from './review';

export default class Movie extends Model {}
Movie.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releasedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'movie', underscored: true }
);
Movie.sync();
