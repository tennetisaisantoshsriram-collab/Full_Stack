// ============================================================
// INHERITANCE TYPE 4: MULTIPLE INHERITANCE  (via Mixins)
// JavaScript does NOT support native multiple inheritance.
// The Mixin pattern is the standard JS approach:
//   - Define behaviours as mixin functions
//   - Compose them onto a base class using extends
// ============================================================

// --- Mixin 1: Flyable behaviour ---
const Flyable = (Base) => class extends Base {
    fly() {
        return `${this.name} spreads wings and soars through the sky!`;
    }

    land() {
        return `${this.name} lands gracefully.`;
    }
};

// --- Mixin 2: Swimmable behaviour ---
const Swimmable = (Base) => class extends Base {
    swim() {
        return `${this.name} dives into the water and swims!`;
    }

    dive() {
        return `${this.name} dives deep underwater.`;
    }
};

// --- Mixin 3: Runnable behaviour ---
const Runnable = (Base) => class extends Base {
    run() {
        return `${this.name} runs at full speed!`;
    }

    sprint() {
        return `${this.name} sprints 100 m.`;
    }
};

// --- Base class ---
class Animal {
    constructor(name, species) {
        this.name    = name;
        this.species = species;
    }

    describe() {
        return `${this.name} is a ${this.species}.`;
    }
}

// Duck — can Fly + Swim + Run  (inherits from all three mixins)
class Duck extends Runnable(Swimmable(Flyable(Animal))) {
    constructor(name) {
        super(name, "Duck");
    }

    quack() {
        return `${this.name} quacks: Quack Quack!`;
    }
}

// Eagle — can Fly + Run but NOT swim
class Eagle extends Runnable(Flyable(Animal)) {
    constructor(name) {
        super(name, "Eagle");
    }

    hunt() {
        return `${this.name} hunts prey from above!`;
    }
}

// Fish — can Swim only
class Fish extends Swimmable(Animal) {
    constructor(name) {
        super(name, "Fish");
    }

    breatheUnderwater() {
        return `${this.name} breathes through gills.`;
    }
}

// --- Demo ---
const duck  = new Duck("Donald");
const eagle = new Eagle("Bald Eagle");
const fish  = new Fish("Nemo");

const results = [
    "=== MULTIPLE INHERITANCE (Mixin Pattern) ===",
    "Mixins: Flyable, Swimmable, Runnable",
    "",
    "--- Duck (Flyable + Swimmable + Runnable + Animal) ---",
    "  " + duck.describe(),
    "  " + duck.fly(),
    "  " + duck.swim(),
    "  " + duck.run(),
    "  " + duck.quack(),
    "",
    "--- Eagle (Flyable + Runnable + Animal) ---",
    "  " + eagle.describe(),
    "  " + eagle.fly(),
    "  " + eagle.run(),
    "  " + eagle.hunt(),
    `  Can eagle swim? ${"swim" in eagle}`,
    "",
    "--- Fish (Swimmable + Animal) ---",
    "  " + fish.describe(),
    "  " + fish.swim(),
    "  " + fish.dive(),
    "  " + fish.breatheUnderwater(),
    `  Can fish fly? ${"fly" in fish}`,
    "",
    "Composition check:",
    `  duck instanceof Animal?  ${duck instanceof Animal}`,
    `  'fly' in duck?           ${"fly"  in duck}`,
    `  'swim' in duck?          ${"swim" in duck}`,
    `  'run' in duck?           ${"run"  in duck}`,
];

if (typeof module !== "undefined") {
    results.forEach(r => console.log(r));
    module.exports = { Animal, Duck, Eagle, Fish, Flyable, Swimmable, Runnable, results };
}
