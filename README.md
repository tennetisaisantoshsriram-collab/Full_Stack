# Student Management System API

A RESTful backend API for managing student records, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Tools**: dotenv, cors, nodemon

## Project Structure

```
case-study/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── studentController.js # Route handlers
├── middleware/
│   ├── asyncHandler.js      # Async error wrapper
│   └── errorMiddleware.js   # Centralized error handler
├── models/
│   └── Student.js           # Mongoose schema
├── routes/
│   └── students.js          # API route definitions
├── public/
│   └── index.html           # API documentation page
├── requests.http            # Sample HTTP requests
├── .env.example
└── server.js
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Edit MONGO_URI with your MongoDB connection string

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/students` | List all students |
| POST | `/api/students` | Register new student |
| GET | `/api/students/:id` | Get by MongoDB ID or rollNo |
| PUT | `/api/students/:id` | Full update |
| PATCH | `/api/students/:id` | Partial update |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/stats/department` | Department-wise statistics |
| GET | `/health` | Health check |

## Query Parameters (GET /api/students)

| Param | Type | Description |
|-------|------|-------------|
| `department` | string | Filter by department |
| `semester` | number | Filter by semester (1–8) |
| `search` | string | Search by name, rollNo, or email |
| `sort` | string | Sort field (prefix `-` for descending) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10) |

## Student Schema

| Field | Type | Constraints |
|-------|------|-------------|
| `rollNo` | String | Required, unique |
| `fullName` | String | Required, min 2 chars |
| `email` | String | Required, unique, valid format |
| `phone` | String | Optional, 10 digits |
| `department` | String | Required |
| `semester` | Number | 1–8, default 1 |
| `cgpa` | Number | 0–10, default 0 |
| `admissionYear` | Number | Defaults to current year |
| `isActive` | Boolean | Default true |

## Error Responses

| Code | Meaning |
|------|---------|
| 400 | Bad request / invalid ID |
| 404 | Student not found |
| 409 | Duplicate rollNo or email |
| 422 | Validation failed |
| 500 | Internal server error |
