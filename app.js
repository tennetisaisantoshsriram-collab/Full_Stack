const express = require('express');
const cors = require('cors');
const studentRoutes = require('./src/routes/studentRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({
    message: 'Student Management System API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      stats: '/api/students/stats/department',
      health: '/health',
    },
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.use('/api/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorMiddleware);

module.exports = app;
