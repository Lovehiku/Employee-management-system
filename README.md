Employee Management System

The Employee Management System is a full stack web application that allows users to manage employee records. The system provides functionality to create, view, and delete employees through a simple and user-friendly interface.

The project demonstrates a complete full stack implementation using a React frontend, a Node.js/Express backend, and a MongoDB database.

Main features include:

Adding new employees

Viewing a list of employees

Deleting employees

Input validation

Communication between frontend and backend using REST APIs

System Architecture

The application follows a client-server architecture where the frontend and backend operate independently but communicate through HTTP requests.

React Frontend  →  Express API Server  →  MongoDB Database
Frontend

The frontend is built using React and is responsible for handling the user interface and user interactions.

Responsibilities include:

Rendering the employee form

Displaying the employee list

Validating user input

Sending HTTP requests to the backend API

Handling loading and error states

Key Components:

EmployeeForm – Used to add new employees

EmployeeTable – Displays the list of employees

Backend

The backend is developed using Node.js and Express and exposes RESTful API endpoints that allow the frontend to interact with the database.

Responsibilities include:

Handling API requests

Validating input data

Communicating with the MongoDB database

Returning structured JSON responses

Handling errors and status codes

Database

The application uses MongoDB with Mongoose for data modeling.

Employee data contains the following fields:

id

name

email (unique)

position

salary

department

created_at

Project Structure
employee-management-system

backend
│
├── models
│   └── Employee.js
│
├── controllers
│   └── employeeController.js
│
├── routes
│   └── employeeRoutes.js
│
└── server.js


frontend
│
├── src
│   ├── components
│   │   ├── EmployeeForm.js
│   │   └── EmployeeTable.js
│   │
│   ├── App.js
│   └── index.js

README.md

This structure separates models, controllers, and routes, making the backend modular and easier to maintain.

Installation and Setup
1. Clone the repository
git clone https://github.com/Lovehiku/Employee-management-system
cd employee-management-system
Backend Setup

Navigate to the backend directory:

cd backend
npm install

Create a .env file and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run the backend server:

npm run dev

The backend server will start at:

http://localhost:5000
Frontend Setup

Open another terminal and navigate to the frontend folder:

cd frontend
npm install
npm start

The frontend application will start at:

http://localhost:3000
API Endpoints
Create Employee

POST /employees

Example Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Backend Developer",
  "salary": 40000,
  "department": "Engineering"
}

Response:

201 Created if the employee is successfully added

400 Bad Request if validation fails

Get All Employees

GET /employees

Returns a list of all employees.

Get Employee by ID

GET /employees/:id

Returns a specific employee by ID.

Delete Employee

DELETE /employees/:id

Deletes an employee record.

Error Handling

The API uses standard HTTP status codes:

200 – Successful request

201 – Resource created

400 – Invalid request data

404 – Resource not found

Author

Hiku
Software Engineering Student
Addis Ababa University
