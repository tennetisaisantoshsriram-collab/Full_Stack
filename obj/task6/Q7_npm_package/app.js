// ============================================================
// Q7: NPM and package.json
// External package: uuid — generates unique IDs
// Run: npm install   (first time only)
// Then: node app.js  OR  npm start
// ============================================================

// Import the external 'uuid' package (installed via npm)
const { v4: uuidv4 } = require("uuid");

// Import built-in Node.js module (no installation needed)
const os = require("os");

// -----------------------------------------------------------
// WHAT IS package.json?
// It is the configuration file for every Node.js project.
// It stores:
//   - Project name, version, description
//   - Entry point (main)
//   - npm scripts (start, test, build, etc.)
//   - Dependencies (packages your project needs)
//   - DevDependencies (packages only needed during development)
// -----------------------------------------------------------

console.log("====== NPM & package.json Demo ======\n");

// Read and display our own package.json
const fs          = require("fs");
const path        = require("path");
const packageData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
);

console.log("--- package.json details ---");
console.log("Project Name :", packageData.name);
console.log("Version      :", packageData.version);
console.log("Description  :", packageData.description);
console.log("Main file    :", packageData.main);
console.log("Dependencies :", JSON.stringify(packageData.dependencies, null, 2));


// -----------------------------------------------------------
// Using the external 'uuid' package
// uuid generates universally unique identifiers (UUIDs)
// Useful for creating unique IDs for users, orders, sessions, etc.
// -----------------------------------------------------------

console.log("\n--- Using uuid Package ---");

// Generate unique student IDs
const students = [
    { name: "Alice",   course: "Web Development" },
    { name: "Bob",     course: "Data Science" },
    { name: "Charlie", course: "Cloud Computing" },
];

const registeredStudents = students.map(student => ({
    id: uuidv4(),       // Generate a unique UUID for each student
    name: student.name,
    course: student.course,
    enrolledAt: new Date().toISOString()
}));

console.log("\nRegistered Students:");
registeredStudents.forEach((s, index) => {
    console.log(`\n[${index + 1}] Name     : ${s.name}`);
    console.log(`    ID       : ${s.id}`);
    console.log(`    Course   : ${s.course}`);
    console.log(`    Enrolled : ${s.enrolledAt}`);
});

// Demonstrate that every UUID is unique
const id1 = uuidv4();
const id2 = uuidv4();
console.log("\n--- UUID Uniqueness Check ---");
console.log("UUID 1:", id1);
console.log("UUID 2:", id2);
console.log("Are they equal?", id1 === id2); // Always false


// -----------------------------------------------------------
// NPM KEY COMMANDS — Summary
// -----------------------------------------------------------
console.log(`
====== NPM Key Commands ======

1. Initialize a new project (creates package.json):
   npm init
   npm init -y          (skip all prompts, use defaults)

2. Install a package and add to dependencies:
   npm install uuid
   npm install uuid@9.0.0   (specific version)

3. Install only devDependencies (e.g., testing tools):
   npm install nodemon --save-dev

4. Install all dependencies listed in package.json:
   npm install

5. Uninstall a package:
   npm uninstall uuid

6. Run a script defined in package.json:
   npm start
   npm test
   npm run build

7. List installed packages:
   npm list

8. Check for outdated packages:
   npm outdated

9. Update packages:
   npm update

10. node_modules/ should NOT be committed to git.
    Add it to .gitignore. Teammates run 'npm install' to restore it.

====== package.json Structure ======

{
  "name":        "project-name",
  "version":     "1.0.0",
  "description": "What this project does",
  "main":        "app.js",            // entry point
  "scripts": {
    "start": "node app.js",           // npm start
    "test":  "jest"                   // npm test
  },
  "dependencies": {
    "uuid": "^9.0.0"                  // needed in production
  },
  "devDependencies": {
    "nodemon": "^3.0.0"              // only needed during development
  }
}
`);
