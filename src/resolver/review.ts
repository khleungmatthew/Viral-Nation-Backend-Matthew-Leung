import { Op } from 'sequelize';
import { getUserByAuthInfo } from '../middlewares/auth';
import Movie from '../models/movie';
import Review from '../models/review';

const createReview = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const movie = await Movie.findOne({
    where: {
      id: args.movieId,
    },
  });
  if (!movie) {
    throw new Error('movie does not exist - id' + args.movieId);
  }
  const review = await Review.findOne({
    where: {
      [Op.and]: [
        { movieId: args.movieId },
        { userId: authUser.getDataValue('id') },
      ],
    },
  });
  if (review) {
    throw new Error('you have submitted the review for this movie');
  }
  const newReview = await Review.create({
    movieId: args.movieId,
    userId: authUser.getDataValue('id'),
    rating: args.rating,
    comment: args.comment,
  });
  return {
    review: {
      id: newReview.getDataValue('id'),
      movieId: newReview.getDataValue('movieId'),
      userId: newReview.getDataValue('userId'),
      rating: newReview.getDataValue('rating'),
      comment: newReview.getDataValue('comment'),
    },
  };
};

const updateReview = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const review = await Review.findOne({
    where: {
      [Op.and]: [
        { movieId: args.movieId },
        { userId: authUser.getDataValue('id') },
      ],
    },
  });
  if (!review) {
    throw new Error(
      'your review for this movie does not exist - movie_id: ' + args.movieId
    );
  }
  const newReview = await Review.update(
    { rating: args.rating, comment: args.comment },
    {
      where: { movieId: args.movieId, userId: authUser.getDataValue('id') },
      returning: true,
    }
  );
  return {
    review: {
      id: newReview[1][0].getDataValue('id'),
      movieId: newReview[1][0].getDataValue('movieId'),
      userId: newReview[1][0].getDataValue('userId'),
      rating: newReview[1][0].getDataValue('rating'),
      comment: newReview[1][0].getDataValue('comment'),
    },
  };
};

const deleteReview = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const review = await Review.findOne({
    where: {
      [Op.and]: [
        { movieId: args.movieId },
        { userId: authUser.getDataValue('id') },
      ],
    },
  });
  if (!review) {
    throw new Error(
      'your review for this movie does not exist - movie_id: ' + args.movieId
    );
  }
  const result = await Review.destroy({
    where: { movieId: args.movieId, userId: authUser.getDataValue('id') },
  });
  return { ok: result };
};

const listReview = async (parent: any, args: any, context: any) => {
  const authUser = await getUserByAuthInfo(context.authInfo);
  if (!authUser) {
    throw new Error('unauthorized access');
  }
  const where = args.filter
    ? { comment: { [Op.iLike]: `%${args.filter}%` } }
    : {};
  const { rows: data, count: total } = await Review.findAndCountAll({
    where: where,
    order: [[args.sortField || 'id', args.sortOrder || 'ASC']],
    limit: args.limit,
    offset: args.offset,
  });
  return {
    reviews: [
      ...data.filter(
        (review) => review.getDataValue('userId') == authUser.getDataValue('id')
      ),
      ...data.filter(
        (review) => review.getDataValue('userId') != authUser.getDataValue('id')
      ),
    ],
    total: total,
    limit: args.limit,
    offset: args.offset,
  };
};

export { createReview, updateReview, deleteReview, listReview };
