import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import Movie from './movie';
import User from './user';

export default class Review extends Model {}
Review.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'review', underscored: true }
);
Review.sync();
