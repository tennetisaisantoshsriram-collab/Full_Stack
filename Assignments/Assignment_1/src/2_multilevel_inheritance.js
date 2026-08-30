// ============================================================
// INHERITANCE TYPE 2: MULTILEVEL INHERITANCE
// A chain: GrandParent → Parent → Child
// Each level extends the one above it.
// ============================================================

class Person {
    constructor(name, age) {
        this.name = name;
        this.age  = age;
    }

    introduce() {
        return `Hi, I am ${this.name}, ${this.age} years old.`;
    }

    eat() {
        return `${this.name} is eating.`;
    }
}

// Employee extends Person  (Level 1)
class Employee extends Person {
    constructor(name, age, company, salary) {
        super(name, age);
        this.company = company;
        this.salary  = salary;
    }

    work() {
        return `${this.name} works at ${this.company}.`;
    }

    getSalary() {
        return `${this.name}'s salary: ₹${this.salary.toLocaleString()}`;
    }
}

// Manager extends Employee  (Level 2 — multilevel chain)
class Manager extends Employee {
    constructor(name, age, company, salary, teamSize) {
        super(name, age, company, salary);
        this.teamSize = teamSize;
    }

    manage() {
        return `${this.name} manages a team of ${this.teamSize} people at ${this.company}.`;
    }

    // Override introduce to include role
    introduce() {
        return `Hi, I am ${this.name}, Manager at ${this.company}.`;
    }
}

// --- Demo ---
const person   = new Person("Alice", 25);
const employee = new Employee("Bob", 30, "TCS", 800000);
const manager  = new Manager("Carol", 40, "Infosys", 2000000, 15);

const results = [
    "=== MULTILEVEL INHERITANCE ===",
    "Chain: Person → Employee → Manager",
    "",
    "Level 0 — Person:",
    "  " + person.introduce(),
    "  " + person.eat(),
    "",
    "Level 1 — Employee (extends Person):",
    "  " + employee.introduce(),   // inherited from Person
    "  " + employee.eat(),         // inherited from Person
    "  " + employee.work(),        // Employee's own method
    "  " + employee.getSalary(),
    "",
    "Level 2 — Manager (extends Employee):",
    "  " + manager.introduce(),    // overridden in Manager
    "  " + manager.eat(),          // inherited from Person (2 levels up)
    "  " + manager.work(),         // inherited from Employee
    "  " + manager.getSalary(),    // inherited from Employee
    "  " + manager.manage(),       // Manager's own method
    "",
    `  manager instanceof Person?   ${manager instanceof Person}`,
    `  manager instanceof Employee? ${manager instanceof Employee}`,
    `  manager instanceof Manager?  ${manager instanceof Manager}`,
];

if (typeof module !== "undefined") {
    results.forEach(r => console.log(r));
    module.exports = { Person, Employee, Manager, results };
}
