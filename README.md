# Appointment Booking Backend API

A backend service for scheduling appointments, with real-time updates and notifications for users and service providers. This project allows users to register, login, view available slots, and book appointments. Service providers can manage their time slots and view booked appointments.

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Role-Based Access**: Distinguishes between Clients and Service Providers.
- **Appointment Management**: Book, view, and cancel appointments.
- **Time Slot Management**: Service providers can create and manage availability.
- **Real-Time Notifications**: Uses Socket.io to notify providers of new bookings.
- **Swagger Documentation**: API documentation available at `/api-docs`.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Real-Time**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger UI
- **Testing**: Node.js native test runner

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd appointment-booking-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory (see `.env.example` or use the keys below):
   ```env
   PORT=3000
   DB_NAME=appointment_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

### Development Mode
```bash
npm start
```
The server will start on `http://localhost:3000`.

### Database Setup
The application uses Sequelize to sync the database schema automatically on startup. Ensure your PostgreSQL server is running and the credentials in `.env` are correct.

## API Documentation

Once the server is running, visit:
**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

## Testing

Run the test suite:
```bash
npm test
```
Note: Integration tests require a running database connection.

## Project Structure

- `src/config`: Database and Swagger configuration
- `src/controllers`: Request handlers
- `src/middleware`: Authentication and logging middleware
- `src/models`: Sequelize data models
- `src/routes`: API route definitions
- `src/utils`: Helper functions
- `src/test`: Unit and integration tests
