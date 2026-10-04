// ============================================================
// collegeDB - Student Management System
// Run with: mongosh collegeDB_students.js
// ============================================================

// 1. Switch to database
use("collegeDB");

// Clear previous data so re-runs stay clean
db.students.drop();

// 2. INSERT 8 students
db.students.insertMany([
  { rollNo: "24CM11",      name: "Sai",        branch: "CSE-AIML", year: 3, marks: 85, email: "sai@example.com"        },
  { rollNo: "23CM121",     name: "Santosh",     branch: "CSE-AIML", year: 3, marks: 92, email: "santosh@example.com"    },
  { rollNo: "23CM1221",    name: "Sri Ram",     branch: "ECE",      year: 2, marks: 67, email: "sriram@example.com"     },
  { rollNo: "23CM12321",   name: "Lepakshi",    branch: "MECH",     year: 1, marks: 45, email: "lepakshi@example.com"   },
  { rollNo: "23CM123321",  name: "Nadh",        branch: "CSE-AIML", year: 2, marks: 78, email: "nadh@example.com"       },
  { rollNo: "23CM1234321", name: "Peter",       branch: "ECE",      year: 3, marks: 55, email: "peter@example.com"      },
  { rollNo: "23CM1211",    name: "Parker",      branch: "MECH",     year: 2, marks: 88, email: "parker@example.com"     },
  { rollNo: "23CM1121",    name: "Tony Stark",  branch: "CSE-AIML", year: 1, marks: 40, email: "tony@example.com"       },
]);

print("Inserted 8 students");

// 3. DISPLAY ALL students
print("\nAll Students:");
db.students.find().forEach(printjson);

// 4. DISPLAY students of a particular branch
print("\nStudents in CSE-AIML:");
db.students.find({ branch: "CSE-AIML" }).forEach(printjson);

// 5. DISPLAY students who scored more than 75
print("\nStudents with marks > 75:");
db.students.find({ marks: { $gt: 75 } }).forEach(printjson);

// 6. SEARCH by rollNo
print("\nSearch by rollNo '23CM1221' (Sri Ram):");
printjson(db.students.findOne({ rollNo: "23CM1221" }));

// 7. SEARCH by condition (year = 2)
print("\nStudents in Year 2:");
db.students.find({ year: 2 }).forEach(printjson);

// 8. UPDATE marks of a particular student
db.students.updateOne(
  { rollNo: "23CM1221" },
  { $set: { marks: 72 } }
);
print("\nUpdated marks of Sri Ram (23CM1221) to 72:");
printjson(db.students.findOne({ rollNo: "23CM1221" }));

// 9. UPDATE another field (email and branch)
db.students.updateOne(
  { rollNo: "23CM12321" },
  { $set: { email: "lepakshi.k@college.edu", branch: "CIVIL" } }
);
print("\nUpdated email and branch of Lepakshi (23CM12321):");
printjson(db.students.findOne({ rollNo: "23CM12321" }));

// 10. DELETE a student by rollNo
db.students.deleteOne({ rollNo: "23CM1121" });
print("\nDeleted Tony Stark (23CM1121)");

// 11. DISPLAY students sorted by marks DESCENDING
print("\nStudents sorted by marks (descending):");
db.students.find({}, { name: 1, rollNo: 1, marks: 1, _id: 0 })
  .sort({ marks: -1 })
  .forEach(printjson);

// 12. CREATE INDEX on rollNo
db.students.createIndex({ rollNo: 1 }, { unique: true });
print("\nIndex created on rollNo");

// 13. DEMONSTRATE indexing - show execution plan
// Without index: COLLSCAN (scans every document)
// With index:    IXSCAN  (jumps directly to the match)
print("\nQuery execution plan with index on rollNo:");
printjson(db.students.find({ rollNo: "24CM11" }).explain("executionStats"));

// ============================================================
// REAL-TIME EXTENSION QUERIES
// ============================================================

// Students scoring above 80
print("\nStudents scoring above 80:");
db.students.find({ marks: { $gt: 80 } }, { name: 1, marks: 1, _id: 0 })
  .forEach(printjson);

// Students scoring below 50
print("\nStudents scoring below 50:");
db.students.find({ marks: { $lt: 50 } }, { name: 1, marks: 1, _id: 0 })
  .forEach(printjson);

// Highest scoring student
print("\nHighest scoring student:");
printjson(
  db.students.find({}, { name: 1, marks: 1, _id: 0 })
    .sort({ marks: -1 })
    .limit(1)
    .toArray()[0]
);

// Students of a particular branch (ECE)
print("\nStudents in ECE branch:");
db.students.find({ branch: "ECE" }, { name: 1, branch: 1, marks: 1, _id: 0 })
  .forEach(printjson);

// Students sorted by marks ascending
print("\nStudents sorted by marks (ascending):");
db.students.find({}, { name: 1, marks: 1, _id: 0 })
  .sort({ marks: 1 })
  .forEach(printjson);

print("\nAll operations completed successfully!");
