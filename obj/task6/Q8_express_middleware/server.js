// ============================================================
// Q8: Middleware in Express.js
// Covers: request-response cycle, logging middleware, custom middleware
// Run: npm install   then   node server.js
// Test: Open browser at http://localhost:3000
//       OR use Postman to send GET/POST requests
// ============================================================

const express = require("express");
const fs      = require("fs");
const path    = require("path");

const app  = express();
const PORT = 3000;

// Allow Express to parse JSON request bodies
app.use(express.json());


// ============================================================
// MIDDLEWARE 1: Request Logger
// Logs method, URL, timestamp for every incoming request.
// This runs BEFORE every route handler.
// ============================================================

const logFile = path.join(__dirname, "requests.log");

function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    const logEntry  = `[${timestamp}] ${req.method} ${req.url} — IP: ${req.ip}\n`;

    // Print to terminal
    console.log(logEntry.trim());

    // Also write to a log file
    fs.appendFileSync(logFile, logEntry);

    // IMPORTANT: Call next() to pass control to the next middleware or route
    next();
}

// Register the logger middleware globally (applies to ALL routes)
app.use(requestLogger);


// ============================================================
// MIDDLEWARE 2: Request Timestamp Injector
// Adds a custom property to req so route handlers can use it.
// ============================================================

function addTimestamp(req, res, next) {
    req.requestTime = new Date().toLocaleString(); // attach to request object
    next();
}

app.use(addTimestamp);


// ============================================================
// MIDDLEWARE 3: Authentication Check (Route-specific)
// Applied only to protected routes, not all routes.
// ============================================================

function checkAuth(req, res, next) {
    const token = req.headers["authorization"];

    if (!token || token !== "Bearer secret123") {
        // Stop the cycle and send an error response
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Missing or invalid token."
        });
    }

    console.log("Auth middleware: Token verified.");
    next(); // token is valid — proceed
}


// ============================================================
// MIDDLEWARE 4: Request Body Validator (for POST /students)
// ============================================================

function validateStudent(req, res, next) {
    const { name, age } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'name' is required and must be a string."
        });
    }

    if (!age || typeof age !== "number" || age < 1 || age > 100) {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'age' must be a number between 1 and 100."
        });
    }

    next(); // validation passed
}


// ============================================================
// ROUTES
// ============================================================

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Express Middleware Demo</h1>
        <p>Request received at: ${req.requestTime}</p>
        <ul>
            <li><a href="/about">GET /about</a></li>
            <li><a href="/students">GET /students</a></li>
            <li><a href="/profile">GET /profile (requires Auth header)</a></li>
        </ul>
        <p>Check your terminal for request logs.</p>
    `);
});

// About route
app.get("/about", (req, res) => {
    res.json({
        project: "PBL Part 2 — Q8",
        topic:   "Express.js Middleware",
        requestTime: req.requestTime
    });
});

// Students list
const students = [
    { id: 1, name: "Alice", course: "Web Dev" },
    { id: 2, name: "Bob",   course: "Data Science" },
];

app.get("/students", (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students,
        requestTime: req.requestTime
    });
});

// Add a student — uses validation middleware (route-specific)
app.post("/students", validateStudent, (req, res) => {
    const newStudent = {
        id:     students.length + 1,
        name:   req.body.name.trim(),
        age:    req.body.age,
        course: req.body.course || "Not specified"
    };
    students.push(newStudent);
    res.status(201).json({
        success: true,
        message: "Student added successfully.",
        data: newStudent
    });
});

// Protected route — uses auth middleware (route-specific)
app.get("/profile", checkAuth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your profile!",
        user:    { id: 42, name: "Admin User", role: "instructor" },
        requestTime: req.requestTime
    });
});

// View the request log
app.get("/logs", (req, res) => {
    if (!fs.existsSync(logFile)) {
        return res.send("No logs yet.");
    }
    const logs = fs.readFileSync(logFile, "utf8");
    res.type("text").send(logs || "Log file is empty.");
});

// 404 handler — must be the LAST middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.url}`
    });
});


// ============================================================
// START THE SERVER
// ============================================================

app.listen(PORT, () => {
    console.log(`
====================================================
  Express Middleware Server running on port ${PORT}
====================================================

Available routes:
  GET  http://localhost:${PORT}/           → Home page
  GET  http://localhost:${PORT}/about      → About info
  GET  http://localhost:${PORT}/students   → List students
  POST http://localhost:${PORT}/students   → Add student (JSON body)
  GET  http://localhost:${PORT}/profile    → Protected (needs Auth header)
  GET  http://localhost:${PORT}/logs       → View request log file

Middleware order for every request:
  1. requestLogger  → logs method, URL, timestamp
  2. addTimestamp   → attaches req.requestTime
  3. (route-specific middleware if any)
  4. Route handler  → sends the final response
====================================================
    `);
});
