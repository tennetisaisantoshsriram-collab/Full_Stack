// ============================================================
// Student Class Definition
// ============================================================
class Student {
    constructor(name, rollNo, department, cgpa) {
        this.name       = name;
        this.rollNo     = rollNo;
        this.department = department;
        this.cgpa       = cgpa;
    }

    // Method: returns all properties as a formatted object
    getDetails() {
        return {
            "Name"       : this.name,
            "Roll No"    : this.rollNo,
            "Department" : this.department,
            "CGPA"       : this.cgpa,
        };
    }
}

// ============================================================
// Event Listener — Button Click
// ============================================================
document.getElementById("generateBtn").addEventListener("click", function () {

    // 1. Read user-provided values from the DOM
    var nameVal  = document.getElementById("studentName").value.trim();
    var rollVal  = document.getElementById("rollNo").value.trim();
    var deptVal  = document.getElementById("department").value.trim();
    var cgpaVal  = document.getElementById("cgpa").value.trim();

    var errorEl = document.getElementById("errorMsg");
    errorEl.textContent = "";

    // 2. Validate inputs
    if (!nameVal || !rollVal || !deptVal || !cgpaVal) {
        errorEl.textContent = "Please fill in all fields before generating the profile.";
        return;
    }

    // 3. Create a Student object using user-provided values
    var student = new Student(nameVal, rollVal, deptVal, parseFloat(cgpaVal).toFixed(2));

    // 4. Get details from the object
    var details = student.getDetails();

    // 5. Dynamically create and display the student profile using DOM manipulation
    var profileCard = document.getElementById("profileCard");

    // Clear any previously generated profile
    profileCard.innerHTML = "";

    // Create one row per property
    for (var key in details) {
        // Create row container
        var row = document.createElement("div");
        row.className = "profile-row";

        // Create label element
        var label = document.createElement("span");
        label.className   = "profile-label";
        label.textContent = key;

        // Create value element
        var value = document.createElement("span");
        value.className   = "profile-value";
        value.textContent = details[key];

        // Append label and value to row, then row to card
        row.appendChild(label);
        row.appendChild(value);
        profileCard.appendChild(row);
    }

    // 6. Show the profile section (was hidden by default)
    var profileSection = document.getElementById("profileSection");
    profileSection.classList.remove("hidden");

    // Scroll to profile
    profileSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
