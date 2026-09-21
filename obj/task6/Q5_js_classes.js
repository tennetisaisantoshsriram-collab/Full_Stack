// ============================================================
// Q5: JavaScript Functions vs Classes
// Demonstrating OOP concepts: classes, objects, properties, methods
// ============================================================

// -----------------------------------------------------------
// PART A: Traditional Function (Factory / Constructor Function)
// -----------------------------------------------------------

// A regular function that creates a student object
function createStudentFunction(name, age, grade) {
    return {
        name: name,
        age: age,
        grade: grade,
        // Method inside function-based object
        introduce: function () {
            console.log(`Hi, I am ${this.name}, aged ${this.age}, in grade ${this.grade}.`);
        },
        study: function (subject) {
            console.log(`${this.name} is studying ${subject}.`);
        }
    };
}

console.log("====== FUNCTION-BASED OBJECTS ======");
const student1 = createStudentFunction("Alice", 20, "A");
const student2 = createStudentFunction("Bob", 22, "B");

student1.introduce();
student1.study("Mathematics");

student2.introduce();
student2.study("Physics");

console.log("\nAre student1 and student2 the same object?", student1 === student2);


// -----------------------------------------------------------
// PART B: ES6 Class — Blueprint for creating multiple objects
// -----------------------------------------------------------

class Student {
    // Constructor: runs automatically when a new object is created
    constructor(name, age, grade) {
        this.name = name;   // property
        this.age = age;     // property
        this.grade = grade; // property
        this.courses = [];  // property — starts as empty array
    }

    // Method: introduce the student
    introduce() {
        console.log(`Hi, I am ${this.name}, aged ${this.age}, in grade ${this.grade}.`);
    }

    // Method: enroll in a course
    enroll(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in "${course}".`);
    }

    // Method: display all enrolled courses
    showCourses() {
        if (this.courses.length === 0) {
            console.log(`${this.name} has not enrolled in any courses yet.`);
        } else {
            console.log(`${this.name}'s courses: ${this.courses.join(", ")}`);
        }
    }

    // Static method: belongs to the class, not to any instance
    static schoolName() {
        console.log("School: Greenwood University");
    }
}


// -----------------------------------------------------------
// PART C: Inheritance — Extending the Student class
// -----------------------------------------------------------

class GraduateStudent extends Student {
    constructor(name, age, grade, researchTopic) {
        super(name, age, grade); // Call parent constructor
        this.researchTopic = researchTopic; // additional property
    }

    // Override the introduce method
    introduce() {
        console.log(
            `Hi, I am ${this.name}, a graduate student researching "${this.researchTopic}".`
        );
    }

    // New method specific to GraduateStudent
    submitThesis() {
        console.log(`${this.name} submitted thesis on "${this.researchTopic}".`);
    }
}


// -----------------------------------------------------------
// PART D: Creating Multiple Objects from the Same Class
// -----------------------------------------------------------

console.log("\n====== CLASS-BASED OBJECTS ======");

const s1 = new Student("Alice", 20, "A");
const s2 = new Student("Bob", 22, "B");
const s3 = new Student("Charlie", 21, "A+");

s1.introduce();
s1.enroll("Web Development");
s1.enroll("Algorithms");
s1.showCourses();

console.log();

s2.introduce();
s2.enroll("Data Science");
s2.showCourses();

console.log();

s3.introduce();
s3.showCourses(); // No courses yet

console.log();

// Static method call — does not need an object instance
Student.schoolName();


// -----------------------------------------------------------
// PART E: Using Inheritance
// -----------------------------------------------------------

console.log("\n====== GRADUATE STUDENTS (INHERITANCE) ======");

const g1 = new GraduateStudent("Diana", 26, "A", "Quantum Computing");
const g2 = new GraduateStudent("Evan", 28, "A+", "Natural Language Processing");

g1.introduce();
g1.enroll("Advanced Algorithms"); // inherited method
g1.showCourses();                  // inherited method
g1.submitThesis();                 // own method

console.log();

g2.introduce();
g2.submitThesis();

// instanceof checks
console.log("\n--- instanceof checks ---");
console.log("s1 instanceof Student:", s1 instanceof Student);         // true
console.log("g1 instanceof GraduateStudent:", g1 instanceof GraduateStudent); // true
console.log("g1 instanceof Student:", g1 instanceof Student);         // true (inherited)
console.log("s1 instanceof GraduateStudent:", s1 instanceof GraduateStudent); // false


// -----------------------------------------------------------
// SUMMARY: Key Differences — Function vs Class
// -----------------------------------------------------------
console.log(`
====== SUMMARY ======
Function-based objects:
  - Created using regular functions
  - No built-in inheritance
  - Each object carries its own copy of methods (can waste memory)

Class-based objects:
  - Cleaner syntax using 'class' keyword
  - Constructor sets initial properties
  - Methods shared via prototype (memory efficient)
  - Supports inheritance with 'extends' and 'super'
  - Supports static methods
`);
