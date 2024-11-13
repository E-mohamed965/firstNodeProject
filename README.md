
# Course & User Management API

This API provides endpoints for managing courses and users, including authentication, registration, and role-based authorization. It's built with Express and MongoDB.

## Features

- **Courses API**: 
  - Create, retrieve, update, and delete courses.
  - Supports pagination for listing courses.
  
- **User API**:
  - User registration with avatar upload.
  - User login with JWT-based authentication.
  - Role-based access control for specific actions.

## Prerequisites

- [Node.js](https://nodejs.org/) - v14+
- [MongoDB](https://www.mongodb.com/) - A running MongoDB instance
- Environment variables:
  - `PORT` - Port to run the server
  - `MONGO_URL` - MongoDB connection string
  - `JWT_SECRET_KEY` - Secret key for JWT generation

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file with the following:
   ```plaintext
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/your-database-name
   JWT_SECRET_KEY=your-secret-key
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the API** at `http://localhost:3000`.

## Folder Structure

- **controllers/**: Functions handling requests and responses for courses and users.
- **middlewares/**: Middleware functions for handling asynchronous errors, token verification, and role-based access.
- **models/**: Mongoose schemas and models for `Course` and `User`.
- **routes/**: API route definitions for `courses` and `users`.
- **utils/**: Utility files, including HTTP messages and custom error handling.

## API Endpoints

### Courses

- `GET /api/courses`: Get a paginated list of courses.
- `POST /api/courses`: Create a new course (requires admin privileges).
- `GET /api/courses/:courseId`: Get a specific course by ID.
- `PATCH /api/courses/:courseId`: Update a course by ID (requires admin privileges).
- `DELETE /api/courses/:courseId`: Delete a course by ID (requires admin privileges).

### Users

- `POST /api/users/register`: Register a new user, with image upload.
- `POST /api/users/login`: Authenticate a user and return a JWT.
- `GET /api/users`: Get a paginated list of users (requires authentication).

### Authorization and Roles

- **Roles**: `ADMIN`, `USER`, `MANAGER`
- Authorization for `DELETE` and `PATCH` operations on courses is restricted to `ADMIN` and `MANAGER` roles.

## Validation

- Course creation requires:
  - `title`: Non-empty, minimum 2 characters.
  - `price`: Non-empty, numerical value.
- User registration requires:
  - `firstName`, `lastName`, `email`, `password`: Non-empty and properly formatted fields.
  - `avatar`: Uploaded file should be an image.

## Error Handling

Errors are standardized with `AppError`, which provides a structured error response. Middleware handles asynchronous errors, invalid token errors, and route not found errors.

## Future Improvements

- Enhance error handling with more detailed messages.
- Add rate limiting and improved security for sensitive routes.
- Expand testing for controller functions and middleware.
