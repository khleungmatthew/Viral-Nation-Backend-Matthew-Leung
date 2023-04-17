# Viral Nation Backend App Graphql Apollo Server Assessment

## Installation

### To clone this repository

```bash
git clone https://github.com/khleungmatthew/Viral-Nation-Backend-Matthew-Leung.git
cd Viral-Nation-Backend-Matthew-Leung
npm install
```

## Build and Run the Server
### To build

```bash
rm -rf dist/ && npm run build && npm run start
```


## Usage
###  Database
Please configure database by the following details:
```bash
host: localhost
port: 5432
username: postgres
password: (none)
schma: vndb
```
###  Authorization
For all APIs except Sign Up and Log In, please add Authorization headers by `Authorization: Bearer {$token}` to request header
Remarks: Json Web Token is valid for 1 hour
###  Sample queries and mutations

### Sign up
```javascript
mutation SignUp($username: String!, $password: String!, $email: String!) {
  signUp(username: $username, password: $password, email: $email) {
    token
    user {
        id
        email
    }
  }
}
// GraphQL Variables
{
    "username": "test",
    "password": "test",
    "email": "test@test.com"
}
```

### Log in
```javascript
mutation LogIn($username: String!, $password: String!) {
  logIn(username: $username, password: $password) {
    token
    user {
        id
        email
    }
  }
}
// GraphQL Variables
{
    "username": "test",
    "password": "test"
}
```

### Change Password
```javascript
mutation ChangePassword($oldPassword: String!, $newPassword: String! ) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    message
  }
}
// GraphQL Variables
{
    "oldPassword": "test4",
    "newPassword": "test"
}
```

### Create Movie
```javascript
mutation CreateMovie($name: String!, $director: String!, $description: String!, $releasedAt: Date! ) {
  createMovie(name: $name, director: $director, description: $description, releasedAt: $releasedAt) {
    movie {
        id
        name
        director
        description
        releasedAt
    }
  }
}
// GraphQL Variables
{
    "name": "amazing movie",
    "director": "John Doe",
    "description": "amazing movie description",
    "releasedAt": "2023-04-15 20:45:00"
}
```

### Update Movie
```javascript
mutation UpdateMovie($id: Int!, $name: String!, $director: String!, $description: String!, $releasedAt: Date! ) {
  updateMovie(id: $id, name: $name, director: $director, description: $description, releasedAt: $releasedAt) {
    movie {
        id
        name
        director
        description
        releasedAt
    }
  }
}
// GraphQL Variables
{
    "id": 1,
    "name": "amazing movie",
    "director": "John Doe",
    "description": "amazing movie description",
    "releasedAt": "2023-04-15 20:45:00"
}
```

### Delete a Movie
```javascript
mutation DeleteMovie($id: Int!) {
  deleteMovie(id: $id) {
    ok
  }
}
// GraphQL Variables
{
    "id": 1
}
```

### Query a list of Movie
```javascript
query ListMovie($limit: Int!, $offset: Int!, $sortField: String, $sortOrder: String, $filter: String) {
  movies(limit: $limit, offset: $offset, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
    movies {
        id
        name
        description
        director
        releasedAt
    }
    total
    limit
    offset
  }
}
// GraphQL Variables
{
    "limit": 10,
    "offset": 0,
    "sortField": "name",
    "sortOrder": "ASC",
    "filter": ""
}
```

### Query Movie by name or description
```javascript
query GetMovie($key: String, $value: String) {
  movie(key: $key, value: $value) {
    movie {
        id
        name
        description
        director
        releasedAt
    }
  }
}
#GraphQL Variables
{
    "key": "name", // or "key": "description"
    "value": "movie"
}
```

### Create Review
```javascript
mutation CreateReview($movieId: Int!, $rating: Float!, $comment: String!) {
  createReview(movieId: $movieId, rating: $rating, comment: $comment) {
    review {
        id
        movieId
        userId
        rating
        comment
    }
  }
}
// GraphQL Variables
{
    "movieId": 1,
    "rating": 11.99,
    "comment": "It's awesome!"
}
```

### Update Review
```javascript
mutation UpdateReview($movieId: Int!, $rating: Float!, $comment: String!) {
  updateReview(movieId: $movieId, rating: $rating, comment: $comment) {
    review {
        id
        movieId
        userId
        rating
        comment
    }
  }
}
// GraphQL Variables
{
    "movieId": 1,
    "rating": 33.99,
    "comment": "It's awesome!"
}
```

### Delete a Review
```javascript
mutation DeleteReview($movieId: Int!) {
  deleteReview(movieId: $movieId) {
    ok
  }
}
// GraphQL Variables
{
    "movieId": 1
}
```

### Query a list of reviews
```javascript
query ListReview($limit: Int!, $offset: Int!, $sortField: String, $sortOrder: String, $filter: String) {
  reviews(limit: $limit, offset: $offset, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
    reviews {
        id
        userId
        movieId
        rating
        comment
    }
    total
    limit
    offset
  }
}
// GraphQL Variables
{
    "limit": 10,
    "offset": 0,
    "sortField": "rating",
    "sortOrder": "DESC",
    "filter": ""
}
```
