// ============================================================
// INHERITANCE TYPE 5: HYBRID INHERITANCE
// A combination of two or more inheritance types.
// Here: Hierarchical + Multilevel + Multiple (Mixin)
//
// Structure:
//   Shape (Base)
//   ├── TwoDShape extends Shape         [Hierarchical branch A]
//   │   ├── Circle extends TwoDShape    [Multilevel]
//   │   └── Rectangle extends TwoDShape [Multilevel]
//   └── ThreeDShape extends Shape       [Hierarchical branch B]
//       └── Sphere extends ThreeDShape  [Multilevel]
//           (+ Colorable mixin)         [Multiple/Mixin]
// ============================================================

// --- Mixin: Colorable ---
const Colorable = (Base) => class extends Base {
    setColor(color) {
        this.color = color;
        return `${this.constructor.name} color set to ${color}.`;
    }

    getColor() {
        return this.color ? `Color: ${this.color}` : "No color set.";
    }
};

// ─── Level 0: Root Base ──────────────────────────────────────
class Shape {
    constructor(name) {
        this.name = name;
    }

    area() {
        return 0;
    }

    describe() {
        return `Shape: ${this.name}`;
    }

    toString() {
        return `[${this.name}] Area = ${this.area().toFixed(2)}`;
    }
}

// ─── Level 1: Hierarchical split ────────────────────────────
class TwoDShape extends Shape {
    constructor(name) {
        super(name);
        this.dimensions = 2;
    }

    perimeter() {
        return 0;
    }

    info() {
        return `${this.name} is a ${this.dimensions}D shape. Area = ${this.area().toFixed(2)}, Perimeter = ${this.perimeter().toFixed(2)}`;
    }
}

class ThreeDShape extends Shape {
    constructor(name) {
        super(name);
        this.dimensions = 3;
    }

    volume() {
        return 0;
    }

    info() {
        return `${this.name} is a ${this.dimensions}D shape. Area = ${this.area().toFixed(2)}, Volume = ${this.volume().toFixed(2)}`;
    }
}

// ─── Level 2: Multilevel from TwoDShape ─────────────────────
class Circle extends TwoDShape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    area()      { return Math.PI * this.radius ** 2; }
    perimeter() { return 2 * Math.PI * this.radius; }
}

class Rectangle extends TwoDShape {
    constructor(width, height) {
        super("Rectangle");
        this.width  = width;
        this.height = height;
    }

    area()      { return this.width * this.height; }
    perimeter() { return 2 * (this.width + this.height); }
}

// ─── Level 2: Multilevel from ThreeDShape + Mixin ──────────
class Sphere extends Colorable(ThreeDShape) {
    constructor(radius, color) {
        super("Sphere");
        this.radius = radius;
        if (color) this.color = color;
    }

    area()   { return 4 * Math.PI * this.radius ** 2; }
    volume() { return (4 / 3) * Math.PI * this.radius ** 3; }
}

// --- Demo ---
const circle    = new Circle(7);
const rectangle = new Rectangle(5, 10);
const sphere    = new Sphere(4, "Blue");

const results = [
    "=== HYBRID INHERITANCE ===",
    "Combining: Hierarchical + Multilevel + Mixin",
    "",
    "--- Circle (TwoDShape → Shape) ---",
    "  " + circle.describe(),
    "  " + circle.info(),
    `  instanceof Shape?     ${circle instanceof Shape}`,
    `  instanceof TwoDShape? ${circle instanceof TwoDShape}`,
    "",
    "--- Rectangle (TwoDShape → Shape) ---",
    "  " + rectangle.describe(),
    "  " + rectangle.info(),
    `  instanceof Shape?     ${rectangle instanceof Shape}`,
    `  instanceof TwoDShape? ${rectangle instanceof TwoDShape}`,
    "",
    "--- Sphere (ThreeDShape → Shape + Colorable mixin) ---",
    "  " + sphere.describe(),
    "  " + sphere.info(),
    "  " + sphere.getColor(),
    "  " + sphere.setColor("Gold"),
    "  " + sphere.getColor(),
    `  instanceof Shape?        ${sphere instanceof Shape}`,
    `  instanceof ThreeDShape?  ${sphere instanceof ThreeDShape}`,
    `  Has Colorable (setColor)? ${"setColor" in sphere}`,
];

if (typeof module !== "undefined") {
    results.forEach(r => console.log(r));
    module.exports = { Shape, TwoDShape, ThreeDShape, Circle, Rectangle, Sphere, Colorable, results };
}
