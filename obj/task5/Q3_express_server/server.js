/**
 * Q3 - Express.js Student Server
 * Routes:
 *   GET /         - Welcome / home page
 *   GET /students - Returns a list of 5 students as JSON
 *   GET /about    - Information about this application
 *
 * Setup:
 *   npm install
 *   node server.js
 *
 * Then open http://localhost:3000 in your browser.
 */

const express = require('express');
const app     = express();
const PORT    = 3000;

// --------------- Data ---------------

// List of student objects (at least 5 as required)
const students = [
  { id: 1, name: 'Aarav Sharma',    branch: 'Computer Science',    year: 3, gpa: 8.7 },
  { id: 2, name: 'Priya Nair',      branch: 'Information Technology', year: 2, gpa: 9.1 },
  { id: 3, name: 'Rohit Verma',     branch: 'Electronics',         year: 4, gpa: 7.8 },
  { id: 4, name: 'Sneha Patel',     branch: 'Computer Science',    year: 1, gpa: 8.3 },
  { id: 5, name: 'Kiran Reddy',     branch: 'Mechanical',          year: 3, gpa: 7.5 },
  { id: 6, name: 'Ananya Iyer',     branch: 'Information Technology', year: 2, gpa: 8.9 },
];

// --------------- Routes ---------------

/**
 * GET / - Home / welcome route
 */
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Student Server</title></head>
      <body style="font-family:sans-serif; padding:40px;">
        <h1>Welcome to the Student Server</h1>
        <p>Available routes:</p>
        <ul>
          <li><a href="/students">/students</a> — View all students (JSON)</li>
          <li><a href="/about">/about</a> — About this application</li>
        </ul>
      </body>
    </html>
  `);
});

/**
 * GET /students - Returns the student list as JSON
 */
app.get('/students', (req, res) => {
  res.json({
    success: true,
    count:   students.length,
    data:    students
  });
});

/**
 * GET /about - Information about the application
 */
app.get('/about', (req, res) => {
  res.send(`
    <html>
      <head><title>About - Student Server</title></head>
      <body style="font-family:sans-serif; padding:40px;">
        <h1>About This Application</h1>
        <p><strong>Name:</strong> Express.js Student Server</p>
        <p><strong>Version:</strong> 1.0.0</p>
        <p><strong>Description:</strong>
          A lightweight REST-style server built with Express.js that serves
          student records via HTTP GET routes.
        </p>
        <p><strong>Routes:</strong></p>
        <ul>
          <li><code>GET /</code> — Home page</li>
          <li><code>GET /students</code> — Returns list of students in JSON format</li>
          <li><code>GET /about</code> — This page</li>
        </ul>
        <p><strong>Tech Stack:</strong> Node.js + Express.js</p>
        <p><a href="/">Back to Home</a></p>
      </body>
    </html>
  `);
});

// --------------- Start Server ---------------

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop.');
});
