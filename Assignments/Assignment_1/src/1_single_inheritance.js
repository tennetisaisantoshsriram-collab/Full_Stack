// ============================================================
// INHERITANCE TYPE 1: SINGLE INHERITANCE
// A child class inherits from exactly one parent class.
// ============================================================

class Animal {
    constructor(name, sound) {
        this.name  = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} says "${this.sound}"`;
    }

    breathe() {
        return `${this.name} breathes air.`;
    }
}

// Dog inherits ALL properties and methods of Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Woof");   // call parent constructor
        this.breed = breed;
    }

    fetch() {
        return `${this.name} (${this.breed}) fetches the ball!`;
    }

    // Overriding parent method (method overriding)
    speak() {
        return `${this.name} barks loudly: "${this.sound}!"`;
    }
}

// --- Demo ---
const genericAnimal = new Animal("Cat", "Meow");
const myDog         = new Dog("Rex", "German Shepherd");

const results = [
    "=== SINGLE INHERITANCE ===",
    "",
    "Parent class (Animal):",
    "  " + genericAnimal.speak(),
    "  " + genericAnimal.breathe(),
    "",
    "Child class (Dog extends Animal):",
    "  " + myDog.speak(),          // overridden method
    "  " + myDog.breathe(),        // inherited from Animal
    "  " + myDog.fetch(),          // Dog's own method
    "",
    `  instanceof Animal? ${myDog instanceof Animal}`,
    `  instanceof Dog?    ${myDog instanceof Dog}`,
];

if (typeof module !== "undefined") {
    results.forEach(r => console.log(r));
    module.exports = { Animal, Dog, results };
}
