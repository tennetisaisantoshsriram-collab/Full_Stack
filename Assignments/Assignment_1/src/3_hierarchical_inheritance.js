// ============================================================
// INHERITANCE TYPE 3: HIERARCHICAL INHERITANCE
// Multiple child classes inherit from ONE parent class.
//
//          Vehicle (Parent)
//         /        |       \
//       Car       Bike    Truck   (Children)
// ============================================================

class Vehicle {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }

    move() {
        return `${this.brand} is moving at ${this.speed} km/h.`;
    }

    fuelType() {
        return `${this.brand} runs on fuel.`;
    }

    describe() {
        return `Vehicle: ${this.brand}, Top Speed: ${this.speed} km/h`;
    }
}

// Child 1 — Car
class Car extends Vehicle {
    constructor(brand, speed, doors) {
        super(brand, speed);
        this.doors = doors;
    }

    honk() {
        return `${this.brand} car honks: Beep Beep!`;
    }

    describe() {
        return `Car: ${this.brand}, ${this.doors} doors, ${this.speed} km/h`;
    }
}

// Child 2 — Bike
class Bike extends Vehicle {
    constructor(brand, speed, type) {
        super(brand, speed);
        this.type = type;
    }

    wheelie() {
        return `${this.brand} ${this.type} bike does a wheelie!`;
    }

    describe() {
        return `Bike: ${this.brand} (${this.type}), ${this.speed} km/h`;
    }
}

// Child 3 — Truck
class Truck extends Vehicle {
    constructor(brand, speed, payload) {
        super(brand, speed);
        this.payload = payload;   // in tons
    }

    loadCargo() {
        return `${this.brand} truck loads ${this.payload} tons of cargo.`;
    }

    describe() {
        return `Truck: ${this.brand}, Payload: ${this.payload}T, ${this.speed} km/h`;
    }
}

// --- Demo ---
const car   = new Car("Toyota", 180, 4);
const bike  = new Bike("Royal Enfield", 140, "Cruiser");
const truck = new Truck("Tata", 100, 20);

const results = [
    "=== HIERARCHICAL INHERITANCE ===",
    "Parent: Vehicle | Children: Car, Bike, Truck",
    "",
    "--- Car (extends Vehicle) ---",
    "  " + car.describe(),
    "  " + car.move(),          // inherited from Vehicle
    "  " + car.fuelType(),      // inherited from Vehicle
    "  " + car.honk(),          // Car's own method
    "",
    "--- Bike (extends Vehicle) ---",
    "  " + bike.describe(),
    "  " + bike.move(),         // inherited from Vehicle
    "  " + bike.fuelType(),     // inherited from Vehicle
    "  " + bike.wheelie(),      // Bike's own method
    "",
    "--- Truck (extends Vehicle) ---",
    "  " + truck.describe(),
    "  " + truck.move(),        // inherited from Vehicle
    "  " + truck.fuelType(),    // inherited from Vehicle
    "  " + truck.loadCargo(),   // Truck's own method
    "",
    "instanceof checks:",
    `  car   instanceof Vehicle? ${car   instanceof Vehicle}`,
    `  bike  instanceof Vehicle? ${bike  instanceof Vehicle}`,
    `  truck instanceof Vehicle? ${truck instanceof Vehicle}`,
    `  car   instanceof Bike?    ${car   instanceof Bike}`,
];

if (typeof module !== "undefined") {
    results.forEach(r => console.log(r));
    module.exports = { Vehicle, Car, Bike, Truck, results };
}
