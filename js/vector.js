// Vector
// Based on code found here:
// https://github.com/adiman9/pureJSCollisions
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    
    static mul(v, s) {
        // Multiplies a vector (v) by a scalar (s)
        return new Vector(v.x * s, v.y * s);
    }
    
    static div(v, s) {
        // Divides a vector (v) by a scalar (s)
        return new Vector(v.x / s, v.y / s);
    }
    
    // Given two vectors and a length, return a new vector 'length'
    // units from 'v1'. 'v2' is used to calculate the slope of the
    // line between 'v1' and 'v2'.
    // Equations source (Answer by John):
    // https://math.stackexchange.com/questions/2045174/how-to-find-a-point-between-two-points-with-given-distance
    static distanceFrom(v1, v2, length) {
        let distance = v1.distance(v2);
        let x = v1.x + (length / distance) * (v2.x - v1.x);
        let y = v1.y + (length / distance) * (v2.y - v1.y);
        return new Vector(x, y);
    }
    
    distance(v) {
        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2)
    }
    
    dot(v) {
        // Returns the dot product of two vectors
        return this.x * v.x + this.y * v.y;
    }
    
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
    tan() {
        // Tangent vector
        return new Vector(-this.y, this.x);
    }
    
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}