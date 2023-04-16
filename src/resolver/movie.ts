import { Op, Order } from 'sequelize';
import { getUserByAuthInfo } from '../middlewares/auth';
import Movie from '../models/movie';

const createMovie = async (parent: any, args: any, context: any) => {
  try {
    const authUser = await getUserByAuthInfo(context.authInfo);
    if (!authUser) {
      throw new Error('unauthorized access');
    }
    const movie = await Movie.create({
      name: args.name,
      director: args.director,
      description: args.description,
      releasedAt: args.releasedAt,
    });
    return {
      movie: {
        id: movie.getDataValue('id'),
        name: movie.getDataValue('name'),
        director: movie.getDataValue('director'),
        description: movie.getDataValue('description'),
        releasedAt: movie.getDataValue('releasedAt'),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMovie = async (parent: any, args: any, context: any) => {
  try {
    const authUser = await getUserByAuthInfo(context.authInfo);
    if (!authUser) {
      throw new Error('unauthorized access');
    }
    const movie = await Movie.findOne({
      where: {
        id: args.id,
      },
    });
    if (!movie) {
      throw new Error('movie cannot be found - id:' + args.id);
    }
    const newMovie = await Movie.update(
      {
        name: args.name,
        director: args.director,
        description: args.description,
        releasedAt: args.releasedAt,
      },
      { where: { id: args.id }, returning: true }
    );
    return {
      movie: {
        id: newMovie[1][0].getDataValue('id'),
        name: newMovie[1][0].getDataValue('name'),
        director: newMovie[1][0].getDataValue('director'),
        description: newMovie[1][0].getDataValue('description'),
        releasedAt: newMovie[1][0].getDataValue('releasedAt'),
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteMovie = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const movie = await Movie.findOne({
    where: {
      id: args.id,
    },
  });
  if (!movie) {
    throw new Error('movie cannot be found - id:' + args.id);
  }
  const result = await Movie.destroy({ where: { id: args.id } });
  return { ok: result };
};

const listMovie = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const where = args.filter ? { name: { [Op.iLike]: `%${args.filter}%` } } : {};
  const { rows: data, count: total } = await Movie.findAndCountAll({
    where: where,
    order: [[args.sortField || 'id', args.sortOrder || 'ASC']],
    limit: args.limit,
    offset: args.offset,
  });
  return {
    movies: data,
    total: total,
    limit: args.limit,
    offset: args.offset,
  };
};

const getMovie = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  if (args.key != 'name' && args.key != 'description') {
    throw new Error('search key should be either name or description');
  }
  const where: Record<string, any> = {};
  where[args.key] = args.value;
  const movie = await Movie.findOne({ where: where });
  if (!movie) {
    throw new Error(
      'movie not found by key: ' + args.key + ' value: ' + args.value
    );
  } else {
    return {
      movie: movie,
    };
  }
};

export { createMovie, updateMovie, deleteMovie, listMovie, getMovie };
