const Student = require('../models/Student');

// Insert a new student document
const createStudent = (data) => Student.create(data);

// Query students with filters, sorting, and pagination
const findStudents = async ({ department, semester, search, sort, page, limit }) => {
  const filter = {};
  if (department) filter.department = department;
  if (semester) filter.semester = Number(semester);
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { rollNo: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [records, total] = await Promise.all([
    Student.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Student.countDocuments(filter),
  ]);

  return { records, total, pages: Math.ceil(total / Number(limit)) };
};

// Find by MongoDB ObjectId or rollNo
const findStudentById = (id) =>
  id.match(/^[a-f\d]{24}$/i)
    ? Student.findById(id)
    : Student.findOne({ rollNo: id });

// Update by ObjectId with schema validation
const updateStudentById = (id, data) =>
  Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });

// Delete by ObjectId
const deleteStudentById = (id) => Student.findByIdAndDelete(id);

// Aggregation: department-wise student count and CGPA stats
const getDepartmentStats = () =>
  Student.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$department',
        totalStudents: { $sum: 1 },
        avgCGPA: { $avg: '$cgpa' },
        minCGPA: { $min: '$cgpa' },
        maxCGPA: { $max: '$cgpa' },
      },
    },
    { $sort: { totalStudents: -1 } },
    {
      $project: {
        _id: 0,
        department: '$_id',
        totalStudents: 1,
        avgCGPA: { $round: ['$avgCGPA', 2] },
        minCGPA: 1,
        maxCGPA: 1,
      },
    },
  ]);

module.exports = {
  createStudent,
  findStudents,
  findStudentById,
  updateStudentById,
  deleteStudentById,
  getDepartmentStats,
};
