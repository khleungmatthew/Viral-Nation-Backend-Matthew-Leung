import Review from '../models/review';
import { changePassword, logIn, signUp } from '../resolver/auth';
import {
  createMovie,
  updateMovie,
  deleteMovie,
  listMovie,
  getMovie,
} from '../resolver/movie';
import {
  createReview,
  deleteReview,
  updateReview,
  listReview,
} from '../resolver/review';

// Provide resolver functions for your schema fields
export const resolvers = {
  Mutation: {
    signUp: signUp,
    logIn: logIn,
    changePassword: changePassword,
    createMovie: createMovie,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    createReview: createReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
  },
  Query: {
    movie: getMovie,
    movies: listMovie,
    reviews: listReview,
  },
};
