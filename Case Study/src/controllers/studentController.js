const service = require('../services/studentService');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/students
exports.create = asyncHandler(async (req, res) => {
  const student = await service.createStudent(req.body);
  res.status(201).json({ success: true, data: student });
});

// GET /api/students
exports.list = asyncHandler(async (req, res) => {
  const { department, semester, search, sort = '-createdAt', page = 1, limit = 10 } = req.query;
  const result = await service.findStudents({ department, semester, search, sort, page, limit });
  res.json({ success: true, ...result, page: Number(page) });
});

// GET /api/students/:id
exports.getOne = asyncHandler(async (req, res) => {
  const student = await service.findStudentById(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, data: student });
});

// PUT /PATCH /api/students/:id
exports.update = asyncHandler(async (req, res) => {
  const student = await service.updateStudentById(req.params.id, req.body);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, data: student });
});

// DELETE /api/students/:id
exports.remove = asyncHandler(async (req, res) => {
  const student = await service.deleteStudentById(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, message: 'Student record deleted successfully' });
});

// GET /api/students/stats/department
exports.stats = asyncHandler(async (req, res) => {
  const data = await service.getDepartmentStats();
  res.json({ success: true, total: data.length, data });
});
