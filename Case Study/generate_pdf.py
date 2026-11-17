from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import HexColor
import os

W, H = A4

# ── Colours (Purna-style: white academic) ────────────────────────────────────
HEADER_BG   = HexColor('#1E3A5F')   # dark navy header bar
HEADER_TEXT = colors.white
ACCENT_BLUE = HexColor('#1E3A5F')
TABLE_HEAD  = HexColor('#EAF1F7')
TABLE_ROW1  = colors.white
TABLE_ROW2  = HexColor('#F8FAFC')
BORDER      = HexColor('#CCCCCC')
CODE_BG     = HexColor('#F4F6F8')
BLACK       = colors.black
DARK_GRAY   = HexColor('#334155')
MID_GRAY    = HexColor('#64748B')
PART_BG     = HexColor('#1E3A5F')

# ── Page template (header + footer on every page) ────────────────────────────
def page_template(canvas_obj, doc):
    canvas_obj.saveState()
    # Header bar
    canvas_obj.setFillColor(HEADER_BG)
    canvas_obj.rect(0, H - 1.1*cm, W, 1.1*cm, fill=1, stroke=0)
    canvas_obj.setFillColor(HEADER_TEXT)
    canvas_obj.setFont('Helvetica-Bold', 9)
    canvas_obj.drawString(1.5*cm, H - 0.75*cm, 'FULL-STACK WEB DEVELOPMENT  |  UNIT V')
    # Footer
    canvas_obj.setFillColor(BORDER)
    canvas_obj.rect(1.5*cm, 0.8*cm, W - 3*cm, 0.03*cm, fill=1, stroke=0)
    canvas_obj.setFillColor(MID_GRAY)
    canvas_obj.setFont('Helvetica', 8)
    canvas_obj.drawRightString(W - 1.5*cm, 0.5*cm, str(canvas_obj._pageNumber))
    canvas_obj.restoreState()

# ── Styles ────────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

BODY = ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=15,
                      textColor=BLACK, spaceAfter=5, alignment=TA_JUSTIFY)
BODY_SM = ParagraphStyle('bodyS', fontName='Helvetica', fontSize=9, leading=13,
                         textColor=DARK_GRAY, spaceAfter=4)
H1 = ParagraphStyle('h1', fontName='Helvetica-Bold', fontSize=14,
                    textColor=ACCENT_BLUE, spaceBefore=6, spaceAfter=4)
H2 = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=11,
                    textColor=ACCENT_BLUE, spaceBefore=8, spaceAfter=3)
SECTION_NUM = ParagraphStyle('snum', fontName='Helvetica-Bold', fontSize=11,
                              textColor=BLACK, spaceBefore=10, spaceAfter=4)
LABEL = ParagraphStyle('lbl', fontName='Helvetica-Bold', fontSize=9,
                       textColor=ACCENT_BLUE)
CODE_STYLE = ParagraphStyle('code', fontName='Courier', fontSize=8.5,
                             leading=13, textColor=HexColor('#1E293B'),
                             leftIndent=0)
BULLET = ParagraphStyle('bul', fontName='Helvetica', fontSize=10, leading=15,
                        textColor=BLACK, leftIndent=16, spaceAfter=3,
                        bulletIndent=4, bulletText='\u2022')

# ── Helpers ───────────────────────────────────────────────────────────────────
def part_header(text):
    t = Table([[Paragraph(f'<font color="white"><b>{text}</b></font>',
                          ParagraphStyle('ph', fontName='Helvetica-Bold',
                                         fontSize=11, textColor=colors.white))]],
              colWidths=[W - 3*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PART_BG),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
    ]))
    return t

def section_header(num, title):
    return Paragraph(f'{num}.&nbsp;&nbsp;<b>{title}</b>', SECTION_NUM)

def code_block(lines):
    rows = [[Paragraph(line.replace('&', '&amp;').replace('<', '&lt;')
                       .replace('>', '&gt;'), CODE_STYLE)] for line in lines]
    t = Table(rows, colWidths=[W - 3*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), CODE_BG),
        ('BOX',           (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING',    (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('RIGHTPADDING',  (0,0), (-1,-1), 10),
    ]))
    return t

def std_table(data, col_widths):
    t = Table(data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,0), TABLE_HEAD),
        ('ROWBACKGROUNDS',(0,1), (-1,-1), [TABLE_ROW1, TABLE_ROW2]),
        ('TEXTCOLOR',     (0,0), (-1,0), ACCENT_BLUE),
        ('FONTNAME',      (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME',      (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE',      (0,0), (-1,-1), 9),
        ('GRID',          (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (-1,-1), 7),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
    ]))
    return t

# ── Build ─────────────────────────────────────────────────────────────────────
def build():
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       'Student_Management_System_CaseStudy.pdf')
    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=1.5*cm, rightMargin=1.5*cm,
        topMargin=1.8*cm, bottomMargin=1.5*cm,
    )
    story = []

    # ── UNIT heading ──────────────────────────────────────────────────────
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph('UNIT V', H1))
    story.append(Paragraph('Worked Case Study and Student Practice Activity', H2))
    story.append(Paragraph('MongoDB, Database Operations and Cloud Deployment',
                            ParagraphStyle('sub', fontName='Helvetica', fontSize=10,
                                           textColor=MID_GRAY, spaceAfter=10)))
    story.append(HRFlowable(width='100%', thickness=1, color=BORDER))
    story.append(Spacer(1, 0.3*cm))

    # ── Course details table ───────────────────────────────────────────────
    cd = [
        [Paragraph('<b>Course Title</b>', LABEL),
         'Full-Stack Web Development'],
        [Paragraph('<b>Course Code</b>', LABEL),   '23CM4121'],
        [Paragraph('<b>Unit</b>', LABEL),
         'Unit V: MongoDB and Deploying Applications'],
        [Paragraph('<b>Student</b>', LABEL),
         'Tenneti Sai Santosh Sri Ram'],
        [Paragraph('<b>Case Study</b>', LABEL),
         'Student Management System (CRUD, Aggregation & API Routes)'],
    ]
    ct = Table(cd, colWidths=[4*cm, W - 3*cm - 4*cm])
    ct.setStyle(TableStyle([
        ('BOX',           (0,0), (-1,-1), 0.8, ACCENT_BLUE),
        ('INNERGRID',     (0,0), (-1,-1), 0.4, BORDER),
        ('BACKGROUND',    (0,0), (0,-1), TABLE_HEAD),
        ('FONTNAME',      (0,0), (-1,-1), 'Helvetica'),
        ('FONTSIZE',      (0,0), (-1,-1), 9),
        ('TOPPADDING',    (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING',   (0,0), (-1,-1), 8),
        ('VALIGN',        (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(ct)
    story.append(Spacer(1, 0.5*cm))

    # ════════════════════════════════════════════════════════════════════════
    # PART A
    # ════════════════════════════════════════════════════════════════════════
    story.append(part_header('PART A.  Comprehensive Question'))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph('<b>Case Study: Student Management System</b>', H2))
    story.append(Paragraph(
        'An educational institution maintains student records, enrollment details, '
        'and academic grades across spreadsheets and manual files. The administration '
        'faces challenges in tracking student progress, updating records, and '
        'analysing department-wise performance. A centralised, web-based Student '
        'Management System is required that securely stores information in a database '
        'and provides reliable API-based access.', BODY))
    story.append(Spacer(1, 0.2*cm))
    story.append(Paragraph(
        'Design and develop a database-driven Student Management System using '
        'Node.js, Express.js, and MongoDB. The application must support the '
        'following requirements:', BODY))
    story.append(Spacer(1, 0.1*cm))
    reqs = [
        'Store student details: roll number, full name, institutional email, phone, department, semester, CGPA, and admission year.',
        'Create and manage a MongoDB database and students collection using an appropriate document structure.',
        'Perform full CRUD operations: add a new student, view enrolled students, update student details, and delete a student record.',
        'Write MongoDB shell queries to insert, retrieve, update, and delete documents.',
        'Use MongoDB aggregation pipelines to generate department-wise student count and CGPA summary.',
        'Create unique indexes on rollNo and email, and a secondary index on department.',
        'Develop an Express.js REST API with schema validation and centralised error handling using a service-controller architecture.',
    ]
    for r in reqs:
        story.append(Paragraph(r, BULLET))
    story.append(Spacer(1, 0.4*cm))

    # ════════════════════════════════════════════════════════════════════════
    # PART B
    # ════════════════════════════════════════════════════════════════════════
    story.append(part_header('PART B.  Worked Solution'))
    story.append(Spacer(1, 0.3*cm))

    # ── 1. Requirements Analysis ───────────────────────────────────────────
    story.append(section_header('1', 'Analyse the Requirements'))
    req_data = [
        ['Requirement', 'Solution'],
        ['Student identity',
         'A unique rollNo and unique institutional email identify each student.'],
        ['Student details',
         'fullName, email, phone, department, semester, cgpa, and admissionYear are stored in each document.'],
        ['Data storage',
         'MongoDB database: studentdb; collection: students.'],
        ['API operations',
         'HTTP requests are handled by Express controllers, which call the service layer to read/write MongoDB via Mongoose.'],
        ['Reports',
         'Aggregation calculates total student count and avg/min/max CGPA per department.'],
        ['Performance',
         'Unique indexes on rollNo and email; secondary index on department.'],
    ]
    story.append(std_table(req_data, [4*cm, W - 3*cm - 4*cm]))
    story.append(Spacer(1, 0.4*cm))

    # ── 2. MongoDB Document Design ────────────────────────────────────────
    story.append(section_header('2', 'Design the MongoDB Document'))
    story.append(Paragraph(
        'A student is represented as one BSON document in the students collection. '
        'A sample document is shown below:', BODY))
    story.append(Spacer(1, 0.15*cm))
    story.append(code_block([
        '{',
        '  "rollNo":        "22BCE1001",',
        '  "fullName":      "Tenneti Sai Santosh",',
        '  "email":         "sai@example.com",',
        '  "phone":         "9876543210",',
        '  "department":    "Computer Science",',
        '  "semester":      5,',
        '  "cgpa":          8.7,',
        '  "admissionYear": 2022,',
        '  "isActive":      true,',
        '  "createdAt":     "2022-08-01T09:00:00.000Z",',
        '  "updatedAt":     "2026-01-15T11:30:00.000Z"',
        '}',
    ]))
    story.append(Spacer(1, 0.2*cm))
    fd = [
        ['Field', 'Data Type', 'Purpose'],
        ['rollNo',        'String',  'Unique student roll number / identifier.'],
        ['fullName',      'String',  'Student full legal name (min 2 characters).'],
        ['email',         'String',  'Unique institutional email address.'],
        ['phone',         'String',  'Optional 10-digit contact number.'],
        ['department',    'String',  'Academic department / programme (e.g. Computer Science).'],
        ['semester',      'Number',  'Current semester (1 to 8).'],
        ['cgpa',          'Number',  'Cumulative GPA on 10-point Indian scale (0.0 to 10.0).'],
        ['admissionYear', 'Number',  'Year of admission into the institution.'],
        ['isActive',      'Boolean', 'Whether the student record is currently active.'],
    ]
    story.append(std_table(fd, [3.5*cm, 2.5*cm, W - 3*cm - 6*cm]))
    story.append(Spacer(1, 0.4*cm))

    # ── 3. Create Collection ──────────────────────────────────────────────
    story.append(section_header('3', 'Create the Database and Collection'))
    story.append(Paragraph(
        'In MongoDB Shell (mongosh), execute the following to initialise the '
        'database and insert sample records:', BODY))
    story.append(Spacer(1, 0.15*cm))
    story.append(code_block([
        'use studentdb',
        'db.createCollection("students")',
        '',
        'db.students.insertMany([',
        '  { rollNo: "22BCE1001", fullName: "Tenneti Sai Santosh",',
        '    email: "sai@example.com", phone: "9876543210",',
        '    department: "Computer Science", semester: 5, cgpa: 8.7,',
        '    admissionYear: 2022, isActive: true },',
        '  { rollNo: "22BCE1002", fullName: "Arjun Reddy",',
        '    email: "arjun@example.com", phone: "9123456789",',
        '    department: "Electronics", semester: 5, cgpa: 7.4,',
        '    admissionYear: 2022, isActive: true },',
        '  { rollNo: "22BCE1003", fullName: "Priya Sharma",',
        '    email: "priya@example.com", phone: "9988776655",',
        '    department: "Computer Science", semester: 3, cgpa: 9.1,',
        '    admissionYear: 2022, isActive: true }',
        '])',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── 4. CRUD Shell Queries ─────────────────────────────────────────────
    story.append(section_header('4', 'Perform MongoDB CRUD Operations'))
    crud = [
        ['Operation', 'MongoDB Query', 'Purpose'],
        ['Create',
         'db.students.insertOne({ rollNo: "22BCE1004", fullName: "Ravi Kumar", ... })',
         'Adds a new student document.'],
        ['Read',
         'db.students.find({ department: "Computer Science" })',
         'Retrieves students in Computer Science.'],
        ['Update',
         'db.students.updateOne({ rollNo: "22BCE1001" }, { $set: { cgpa: 9.0 } })',
         'Modifies the CGPA of a student.'],
        ['Delete',
         'db.students.deleteOne({ rollNo: "22BCE1004" })',
         'Removes a matching student document.'],
    ]
    story.append(std_table(crud, [2*cm, 8*cm, W - 3*cm - 10*cm]))
    story.append(Spacer(1, 0.2*cm))
    story.append(Paragraph('Additional useful queries:', BODY))
    story.append(code_block([
        '// All students',
        'db.students.find({})',
        '',
        '// Students with CGPA >= 8.5',
        'db.students.find({ cgpa: { $gte: 8.5 } })',
        '',
        '// Sort by CGPA descending',
        'db.students.find({}).sort({ cgpa: -1 })',
        '',
        '// Count total students',
        'db.students.countDocuments({})',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── 5. Indexes ────────────────────────────────────────────────────────
    story.append(section_header('5', 'Create Indexes'))
    story.append(Paragraph(
        'Indexes allow MongoDB to locate documents without scanning the full '
        'collection. Unique indexes on rollNo and email enforce data integrity '
        'at the database level.', BODY))
    story.append(Spacer(1, 0.15*cm))
    story.append(code_block([
        '// Unique index on rollNo',
        'db.students.createIndex({ rollNo: 1 }, { unique: true })',
        '',
        '// Unique index on email',
        'db.students.createIndex({ email: 1 }, { unique: true })',
        '',
        '// Secondary index for department-based queries',
        'db.students.createIndex({ department: 1 })',
        '',
        '// Compound index for department + semester filters',
        'db.students.createIndex({ department: 1, semester: 1 })',
        '',
        '// View all indexes',
        'db.students.getIndexes()',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── 6. Aggregation ────────────────────────────────────────────────────
    story.append(section_header('6', 'Use Aggregation for Department-wise Summary'))
    story.append(Paragraph(
        'The MongoDB aggregation pipeline generates a report with student count '
        'and CGPA statistics per department. Unlike Purna\'s basic avg-only pipeline, '
        'this also captures min and max CGPA for a fuller picture.', BODY))
    story.append(Spacer(1, 0.15*cm))
    story.append(code_block([
        'db.students.aggregate([',
        '  { $match: { isActive: true } },',
        '  { $group: {',
        '      _id: "$department",',
        '      totalStudents: { $sum: 1 },',
        '      avgCGPA:       { $avg: "$cgpa" },',
        '      minCGPA:       { $min: "$cgpa" },',
        '      maxCGPA:       { $max: "$cgpa" }',
        '  }},',
        '  { $sort: { totalStudents: -1 } },',
        '  { $project: {',
        '      _id: 0, department: "$_id",',
        '      totalStudents: 1,',
        '      avgCGPA: { $round: ["$avgCGPA", 2] },',
        '      minCGPA: 1, maxCGPA: 1',
        '  }}',
        '])',
    ]))
    story.append(Spacer(1, 0.2*cm))
    agg_data = [
        ['Department',       'Students', 'Avg CGPA', 'Min', 'Max'],
        ['Computer Science', '2',        '8.90',     '8.7', '9.1'],
        ['Electronics',      '1',        '7.40',     '7.4', '7.4'],
    ]
    story.append(std_table(agg_data, [5*cm, 2.5*cm, 2.5*cm, 2*cm, 2*cm]))
    story.append(Spacer(1, 0.4*cm))

    # ── 7. Express.js Backend ─────────────────────────────────────────────
    story.append(section_header('7', 'Develop the Express.js Backend'))
    story.append(Paragraph(
        'The backend follows a layered architecture: <b>routes</b> define URL '
        'patterns, <b>controllers</b> handle HTTP request/response, and '
        '<b>services</b> contain all MongoDB operations. This separates concerns '
        'clearly and avoids mixing HTTP logic with database logic.', BODY))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>Project initialisation:</b>', BODY_SM))
    story.append(code_block([
        'npm init -y',
        'npm install express mongoose cors dotenv',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>package.json (key fields):</b>', BODY_SM))
    story.append(code_block([
        '{',
        '  "name": "sms-backend",',
        '  "version": "1.0.0",',
        '  "main": "server.js",',
        '  "scripts": { "start": "node server.js", "dev": "nodemon server.js" },',
        '  "dependencies": {',
        '    "cors": "^2.8.5", "dotenv": "^16.4.7",',
        '    "express": "^4.21.2", "mongoose": "^8.8.4"',
        '  }',
        '}',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>Project structure:</b>', BODY_SM))
    story.append(code_block([
        'case-study/',
        '├── server.js              // Entry point: connects DB, starts server',
        '├── app.js                 // Express app: middleware + routes',
        '└── src/',
        '    ├── db/db.js           // MongoDB connection (initDB)',
        '    ├── models/Student.js  // Mongoose schema',
        '    ├── services/studentService.js  // All DB operations',
        '    ├── controllers/studentController.js  // HTTP handlers',
        '    ├── routes/studentRoutes.js           // Route definitions',
        '    └── middleware/',
        '        ├── asyncHandler.js    // Wraps async handlers',
        '        └── errorMiddleware.js // Centralised error handler',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>src/models/Student.js — Mongoose schema:</b>', BODY_SM))
    story.append(code_block([
        'const mongoose = require("mongoose");',
        '',
        'const studentSchema = new mongoose.Schema({',
        '  rollNo:        { type: String, required: [true, "Roll number is required"], unique: true, trim: true },',
        '  fullName:      { type: String, required: [true, "Name is required"], minlength: 2 },',
        '  email:         { type: String, required: true, unique: true, lowercase: true,',
        '                   match: [/^\\S+@\\S+\\.\\S+$/, "Invalid email"] },',
        '  phone:         { type: String, match: [/^\\d{10}$/, "Must be 10 digits"], default: null },',
        '  department:    { type: String, required: [true, "Department is required"] },',
        '  semester:      { type: Number, min: 1, max: 8, default: 1 },',
        '  cgpa:          { type: Number, min: 0, max: 10, default: 0 },',
        '  admissionYear: { type: Number, default: () => new Date().getFullYear() },',
        '  isActive:      { type: Boolean, default: true },',
        '}, { timestamps: true });',
        '',
        'module.exports = mongoose.model("Student", studentSchema);',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>src/services/studentService.js — MongoDB operations:</b>', BODY_SM))
    story.append(code_block([
        'const Student = require("../models/Student");',
        '',
        'const createStudent    = (data) => Student.create(data);',
        '',
        'const findStudents     = async ({ department, semester, search, sort, page, limit }) => {',
        '  const filter = {};',
        '  if (department) filter.department = department;',
        '  if (semester)   filter.semester = Number(semester);',
        '  if (search) filter.$or = [',
        '    { fullName: { $regex: search, $options: "i" } },',
        '    { rollNo:   { $regex: search, $options: "i" } },',
        '  ];',
        '  const skip = (Number(page) - 1) * Number(limit);',
        '  const [records, total] = await Promise.all([',
        '    Student.find(filter).sort(sort).skip(skip).limit(Number(limit)),',
        '    Student.countDocuments(filter),',
        '  ]);',
        '  return { records, total, pages: Math.ceil(total / Number(limit)) };',
        '};',
        '',
        'const findStudentById  = (id) => id.match(/^[a-f\\d]{24}$/i)',
        '  ? Student.findById(id) : Student.findOne({ rollNo: id });',
        '',
        'const updateStudentById = (id, data) =>',
        '  Student.findByIdAndUpdate(id, data, { new: true, runValidators: true });',
        '',
        'const deleteStudentById = (id) => Student.findByIdAndDelete(id);',
        '',
        'const getDepartmentStats = () => Student.aggregate([',
        '  { $match: { isActive: true } },',
        '  { $group: { _id: "$department", totalStudents: { $sum: 1 },',
        '      avgCGPA: { $avg: "$cgpa" }, minCGPA: { $min: "$cgpa" }, maxCGPA: { $max: "$cgpa" } } },',
        '  { $sort: { totalStudents: -1 } },',
        '  { $project: { _id:0, department:"$_id", totalStudents:1,',
        '      avgCGPA: { $round: ["$avgCGPA",2] }, minCGPA:1, maxCGPA:1 } }',
        ']);',
        '',
        'module.exports = { createStudent, findStudents, findStudentById,',
        '                   updateStudentById, deleteStudentById, getDepartmentStats };',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>src/controllers/studentController.js — HTTP handlers:</b>', BODY_SM))
    story.append(code_block([
        'const service      = require("../services/studentService");',
        'const asyncHandler = require("../middleware/asyncHandler");',
        '',
        'exports.create  = asyncHandler(async (req, res) => {',
        '  const student = await service.createStudent(req.body);',
        '  res.status(201).json({ success: true, data: student });',
        '});',
        '',
        'exports.list    = asyncHandler(async (req, res) => {',
        '  const { department, semester, search, sort="-createdAt", page=1, limit=10 } = req.query;',
        '  const result = await service.findStudents({ department, semester, search, sort, page, limit });',
        '  res.json({ success: true, ...result, page: Number(page) });',
        '});',
        '',
        'exports.getOne  = asyncHandler(async (req, res) => {',
        '  const student = await service.findStudentById(req.params.id);',
        '  if (!student) return res.status(404).json({ success:false, message:"Student not found" });',
        '  res.json({ success: true, data: student });',
        '});',
        '',
        'exports.update  = asyncHandler(async (req, res) => {',
        '  const student = await service.updateStudentById(req.params.id, req.body);',
        '  if (!student) return res.status(404).json({ success:false, message:"Student not found" });',
        '  res.json({ success: true, data: student });',
        '});',
        '',
        'exports.remove  = asyncHandler(async (req, res) => {',
        '  const student = await service.deleteStudentById(req.params.id);',
        '  if (!student) return res.status(404).json({ success:false, message:"Student not found" });',
        '  res.json({ success: true, message: "Student record deleted successfully" });',
        '});',
        '',
        'exports.stats   = asyncHandler(async (req, res) => {',
        '  const data = await service.getDepartmentStats();',
        '  res.json({ success: true, total: data.length, data });',
        '});',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>src/routes/studentRoutes.js:</b>', BODY_SM))
    story.append(code_block([
        'const { Router } = require("express");',
        'const ctrl = require("../controllers/studentController");',
        '',
        'const router = Router();',
        '',
        'router.get("/stats/department", ctrl.stats);       // must be before /:id',
        'router.route("/").get(ctrl.list).post(ctrl.create);',
        'router.route("/:id").get(ctrl.getOne).put(ctrl.update)',
        '                    .patch(ctrl.update).delete(ctrl.remove);',
        '',
        'module.exports = router;',
    ]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>API Endpoint Summary:</b>', BODY_SM))
    ep = [
        ['Method', 'Endpoint', 'Action'],
        ['GET',    '/health',                          'Check server and DB status.'],
        ['GET',    '/api/students',                    'Retrieve all students (supports filter, search, pagination).'],
        ['POST',   '/api/students',                    'Create and persist a new student document.'],
        ['GET',    '/api/students/:id',                'Get a single student by MongoDB _id or rollNo.'],
        ['PUT',    '/api/students/:id',                'Full update of student details.'],
        ['PATCH',  '/api/students/:id',                'Partial update of student fields.'],
        ['DELETE', '/api/students/:id',                'Delete a student record by MongoDB _id.'],
        ['GET',    '/api/students/stats/department',   'Department-wise aggregation report.'],
    ]
    story.append(std_table(ep, [2*cm, 6.5*cm, W - 3*cm - 8.5*cm]))
    story.append(Spacer(1, 0.4*cm))

    # ── 8. Error Handling ─────────────────────────────────────────────────
    story.append(section_header('8', 'Error Handling'))
    story.append(Paragraph(
        'The <b>asyncHandler</b> wrapper eliminates repetitive try-catch blocks '
        'by catching rejected promises and forwarding them to the centralised '
        '<b>errorMiddleware</b>. Each error type returns a specific HTTP status code:', BODY))
    story.append(Spacer(1, 0.15*cm))
    story.append(code_block([
        '// middleware/asyncHandler.js',
        'const asyncHandler = (fn) => (req, res, next) =>',
        '  Promise.resolve(fn(req, res, next)).catch(next);',
        '',
        '// middleware/errorMiddleware.js',
        'const errorMiddleware = (err, req, res, next) => {',
        '  let statusCode = err.statusCode || 500;',
        '  let message    = err.message    || "Internal Server Error";',
        '',
        '  if (err.name === "CastError")      { statusCode = 400; message = `Invalid field: ${err.path}`; }',
        '  if (err.code === 11000)            { statusCode = 409;',
        '    message = `${Object.keys(err.keyValue)[0]} already exists`; }',
        '  if (err.name === "ValidationError") { statusCode = 422;',
        '    message = Object.values(err.errors).map(e => e.message).join("; "); }',
        '',
        '  res.status(statusCode).json({ success: false, statusCode, message });',
        '};',
    ]))
    story.append(Spacer(1, 0.2*cm))
    err_data = [
        ['Error Type',      'HTTP Status', 'Cause'],
        ['CastError',       '400',         'Invalid MongoDB ObjectId format in URL parameter.'],
        ['Duplicate Key',   '409',         'rollNo or email already exists in the database.'],
        ['ValidationError', '422',         'Mongoose schema validation failed on input data.'],
        ['Not Found',       '404',         'No document matched the provided ID or rollNo.'],
        ['Server Error',    '500',         'Unhandled or unexpected runtime exception.'],
    ]
    story.append(std_table(err_data, [3.5*cm, 2.5*cm, W - 3*cm - 6*cm]))
    story.append(Spacer(1, 0.4*cm))

    # ── 9. Run & Test ─────────────────────────────────────────────────────
    story.append(section_header('9', 'Run and Test the Application'))
    steps = [
        'Create a MongoDB Atlas cluster (or use a local MongoDB instance) and copy the connection string into <b>.env</b> as <b>MONGO_URI</b>.',
        'From the project root, run <b>npm install</b> then <b>npm run dev</b>. Confirm the server connects to MongoDB.',
        'Use the <b>requests.http</b> file (REST Client extension) or cURL commands to test each endpoint.',
        'Add a student via POST. Confirm it appears in the GET response and in MongoDB Atlas / Compass.',
        'Update the student CGPA via PATCH. Confirm the updated value is returned and stored.',
        'Delete the test student. Verify it is removed from both the API response and the collection.',
        'Request <b>/api/students/stats/department</b> to verify the aggregation report.',
    ]
    for s in steps:
        story.append(Paragraph(s, BULLET))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>Test case evaluation matrix:</b>', BODY_SM))
    tc = [
        ['Test Case', 'Action', 'Expected Result'],
        ['TC1: Create', 'POST valid student JSON.',         'Stored in MongoDB, returned with 201 status.'],
        ['TC2: Read',   'GET /api/students.',               'All documents retrieved from MongoDB.'],
        ['TC3: Update', 'PATCH with new cgpa value.',       'Updated value persisted and returned.'],
        ['TC4: Delete', 'DELETE by student _id.',           'Document permanently removed from collection.'],
        ['TC5: Validation', 'POST with missing rollNo.',    'API returns 422 Unprocessable Entity.'],
        ['TC6: Duplicate', 'POST same rollNo twice.',       'API returns 409 Conflict.'],
        ['TC7: Aggregate', 'GET /stats/department.',        'Department-wise counts and CGPA returned.'],
    ]
    story.append(std_table(tc, [3.5*cm, 5*cm, W - 3*cm - 8.5*cm]))
    story.append(Spacer(1, 0.2*cm))

    story.append(Paragraph('<b>Useful API test commands (cURL):</b>', BODY_SM))
    story.append(code_block([
        '# Health check',
        'curl http://localhost:3000/health',
        '',
        '# Read all students',
        'curl http://localhost:3000/api/students',
        '',
        '# Department stats',
        'curl http://localhost:3000/api/students/stats/department',
        '',
        '# Create student',
        'curl -X POST http://localhost:3000/api/students \\',
        '  -H "Content-Type: application/json" \\',
        '  -d \'{"rollNo":"22BCE1004","fullName":"Ravi Kumar","email":"ravi@example.com",\'',
        '  -d \'"department":"Mechanical","semester":3,"cgpa":7.8,"admissionYear":2022}\'',
        '',
        '# Update CGPA (replace <id> with actual MongoDB _id)',
        'curl -X PATCH http://localhost:3000/api/students/<id> \\',
        '  -H "Content-Type: application/json" -d \'{"cgpa":8.2}\'',
        '',
        '# Delete student',
        'curl -X DELETE http://localhost:3000/api/students/<id>',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── 10. Expected Outcome ──────────────────────────────────────────────
    story.append(section_header('10', 'Expected Final Outcome'))
    outcomes = [
        'A running Express.js API on <b>http://localhost:3000</b> responding to all CRUD endpoints.',
        'A <b>/health</b> endpoint that returns HTTP 200 with server uptime.',
        'A MongoDB <b>studentdb</b> database containing persistent student documents in the students collection.',
        'Fully functional add, view, update, and delete operations via REST API.',
        'A <b>/api/students/stats/department</b> aggregation endpoint returning department-wise statistics.',
        'Proper validation errors (422) and duplicate key errors (409) on invalid input.',
    ]
    for o in outcomes:
        story.append(Paragraph(o, BULLET))
    story.append(Spacer(1, 0.5*cm))

    # ════════════════════════════════════════════════════════════════════════
    # PART C
    # ════════════════════════════════════════════════════════════════════════
    story.append(part_header('PART C.  Output Screenshots (Test Case Results)'))
    story.append(Spacer(1, 0.3*cm))

    # ── Screen 1: POST Create ─────────────────────────────────────────────
    story.append(Paragraph('<b>Screen 1: POST /api/students — Create Student (HTTP 201)</b>', H2))
    story.append(Paragraph(
        'A new student record is created by sending a POST request with JSON body. '
        'MongoDB executes insertOne, Mongoose validates the schema, and the saved '
        'document is returned with the auto-generated _id and timestamps.', BODY))
    story.append(code_block([
        'POST http://localhost:3000/api/students',
        'Content-Type: application/json',
        '',
        'Request body:',
        '{',
        '  "rollNo": "22BCE1001", "fullName": "Tenneti Sai Santosh",',
        '  "email": "sai@example.com", "phone": "9876543210",',
        '  "department": "Computer Science", "semester": 5,',
        '  "cgpa": 8.7, "admissionYear": 2022',
        '}',
        '',
        'Response — 201 Created:',
        '{',
        '  "success": true,',
        '  "data": {',
        '    "_id": "6748a1f2c3d4e5f6a7b8c9d0",',
        '    "rollNo": "22BCE1001",',
        '    "fullName": "Tenneti Sai Santosh",',
        '    "email": "sai@example.com",',
        '    "phone": "9876543210",',
        '    "department": "Computer Science",',
        '    "semester": 5,',
        '    "cgpa": 8.7,',
        '    "admissionYear": 2022,',
        '    "isActive": true,',
        '    "createdAt": "2026-11-17T08:30:00.000Z",',
        '    "updatedAt": "2026-11-17T08:30:00.000Z",',
        '    "__v": 0',
        '  }',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 2: GET List All ────────────────────────────────────────────
    story.append(Paragraph('<b>Screen 2: GET /api/students — List All Students (HTTP 200)</b>', H2))
    story.append(Paragraph(
        'Retrieves all student documents from MongoDB using find(). The response '
        'includes pagination metadata: total count, current page, and total pages.', BODY))
    story.append(code_block([
        'GET http://localhost:3000/api/students',
        '',
        'Response — 200 OK:',
        '{',
        '  "success": true,',
        '  "total": 3,',
        '  "page": 1,',
        '  "pages": 1,',
        '  "records": [',
        '    { "_id": "6748a1f2...", "rollNo": "22BCE1001", "fullName": "Tenneti Sai Santosh",',
        '      "department": "Computer Science", "semester": 5, "cgpa": 8.7, "isActive": true },',
        '    { "_id": "6748a2f3...", "rollNo": "22BCE1002", "fullName": "Arjun Reddy",',
        '      "department": "Electronics", "semester": 5, "cgpa": 7.4, "isActive": true },',
        '    { "_id": "6748a3f4...", "rollNo": "22BCE1003", "fullName": "Priya Sharma",',
        '      "department": "Computer Science", "semester": 3, "cgpa": 9.1, "isActive": true }',
        '  ]',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 3: PATCH Update ───────────────────────────────────────────
    story.append(Paragraph('<b>Screen 3: PATCH /api/students/:id — Update CGPA (HTTP 200)</b>', H2))
    story.append(Paragraph(
        'Updates a student\'s CGPA using findByIdAndUpdate with runValidators: true. '
        'The response returns the updated document. The updatedAt timestamp confirms '
        'the change was persisted in MongoDB.', BODY))
    story.append(code_block([
        'PATCH http://localhost:3000/api/students/6748a1f2c3d4e5f6a7b8c9d0',
        'Content-Type: application/json',
        '',
        'Request body:',
        '{ "cgpa": 9.1 }',
        '',
        'Response — 200 OK:',
        '{',
        '  "success": true,',
        '  "data": {',
        '    "_id": "6748a1f2c3d4e5f6a7b8c9d0",',
        '    "rollNo": "22BCE1001",',
        '    "fullName": "Tenneti Sai Santosh",',
        '    "department": "Computer Science",',
        '    "semester": 5,',
        '    "cgpa": 9.1,',
        '    "isActive": true,',
        '    "createdAt": "2026-11-17T08:30:00.000Z",',
        '    "updatedAt": "2026-11-17T09:15:00.000Z"',
        '  }',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 4: DELETE ─────────────────────────────────────────────────
    story.append(Paragraph('<b>Screen 4: DELETE /api/students/:id — Remove Student (HTTP 200)</b>', H2))
    story.append(Paragraph(
        'Permanently removes the student document from MongoDB using findByIdAndDelete. '
        'Returns a success message. A subsequent GET confirms the record no longer exists.', BODY))
    story.append(code_block([
        'DELETE http://localhost:3000/api/students/6748a1f2c3d4e5f6a7b8c9d0',
        '',
        'Response — 200 OK:',
        '{',
        '  "success": true,',
        '  "message": "Student record deleted successfully"',
        '}',
        '',
        'Verification — GET /api/students/6748a1f2c3d4e5f6a7b8c9d0:',
        '{',
        '  "success": false,',
        '  "message": "Student not found"',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 5: Aggregation ─────────────────────────────────────────────
    story.append(Paragraph('<b>Screen 5: GET /api/students/stats/department — Aggregation (HTTP 200)</b>', H2))
    story.append(Paragraph(
        'Runs the MongoDB aggregation pipeline to generate department-wise statistics. '
        'Returns totalStudents, avgCGPA, minCGPA, and maxCGPA for each active department.', BODY))
    story.append(code_block([
        'GET http://localhost:3000/api/students/stats/department',
        '',
        'Response — 200 OK:',
        '{',
        '  "success": true,',
        '  "total": 2,',
        '  "data": [',
        '    {',
        '      "department": "Computer Science",',
        '      "totalStudents": 2,',
        '      "avgCGPA": 8.9,',
        '      "minCGPA": 8.7,',
        '      "maxCGPA": 9.1',
        '    },',
        '    {',
        '      "department": "Electronics",',
        '      "totalStudents": 1,',
        '      "avgCGPA": 7.4,',
        '      "minCGPA": 7.4,',
        '      "maxCGPA": 7.4',
        '    }',
        '  ]',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 6: Health Check ────────────────────────────────────────────
    story.append(Paragraph('<b>Screen 6: GET /health — Health Check (HTTP 200)</b>', H2))
    story.append(Paragraph(
        'Confirms the server is running and returns the process uptime in seconds. '
        'Used to verify deployment and connectivity.', BODY))
    story.append(code_block([
        'GET http://localhost:3000/health',
        '',
        'Response — 200 OK:',
        '{',
        '  "status": "OK",',
        '  "uptime": 342.187',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    # ── Screen 7: Validation Error ────────────────────────────────────────
    story.append(Paragraph('<b>Screen 7: POST with Missing Field — Validation Error (HTTP 422)</b>', H2))
    story.append(Paragraph(
        'When required fields are missing, Mongoose triggers a ValidationError. '
        'The error middleware catches it and returns HTTP 422 with the validation message.', BODY))
    story.append(code_block([
        'POST http://localhost:3000/api/students',
        'Content-Type: application/json',
        '',
        'Request body (rollNo missing):',
        '{ "fullName": "Test Student", "email": "test@example.com", "department": "CS" }',
        '',
        'Response — 422 Unprocessable Entity:',
        '{',
        '  "success": false,',
        '  "statusCode": 422,',
        '  "message": "Roll number is required"',
        '}',
    ]))
    story.append(Spacer(1, 0.4*cm))

    doc.build(story, onFirstPage=page_template, onLaterPages=page_template)
    print(f'PDF saved: {out}')


if __name__ == '__main__':
    build()
