// Construct a schema, using GraphQL schema language
export const typeDefs = `#graphql
    scalar Date
    
    type User {
        id: Int!
        email: String!
    }
    type Movie {
        id: Int!
        name: String!
        director: String!
        description: String!
        releasedAt: Date!
    }
    type Review {
        id: Int!
        movieId: Int!
        userId: Int!
        rating: Float!
        comment: String!
    }

    type Mutation {
        signUp(email: String!, username: String!, password: String!): AuthResponse
        logIn(username: String!, password: String!): AuthResponse
        changePassword(oldPassword: String!, newPassword: String!): ChangePasswordResponse
        createMovie(name: String, director: String, description: String!, releasedAt: Date!): CreateMovieResponse
        updateMovie(id: Int!, name: String, director: String, description: String!, releasedAt: Date!): UpdateMovieResponse
        deleteMovie(id: Int!): DeleteMovieResponse
        createReview(movieId: Int!, rating: Float!, comment: String): CreateReviewResponse
        updateReview(movieId: Int!, rating: Float!, comment: String): UpdateReviewResponse
        deleteReview(movieId: Int!): DeleteReviewResponse
    }

    type AuthResponse {
        token: String
        user: User
    }

    type ChangePasswordResponse {
        message: String
    }

    type CreateMovieResponse {
        movie: Movie
    }

    type UpdateMovieResponse {
        movie: Movie
    }

    type DeleteMovieResponse {
        ok: Boolean!
    }

    type listMovieResponse {
        movies: [Movie!]
        total: Int!
        limit: Int!
        offset: Int!
    }

    type getMovieResponse {
        movie: Movie
    }

    type CreateReviewResponse {
        review: Review
    }

    type UpdateReviewResponse {
        review: Review
    }

    type DeleteReviewResponse {
        ok: Boolean!
    }

    type listReviewResponse {
        reviews: [Review!]
        total: Int!
        limit: Int!
        offset: Int!
    }

    type Query {
        movie(key: String, value: String): getMovieResponse
        movies(limit: Int!, offset: Int!, sortField: String, sortOrder: String, filter: String): listMovieResponse
        reviews(limit: Int!, offset: Int!, sortField: String, sortOrder: String, filter: String): listReviewResponse
    }
`;
