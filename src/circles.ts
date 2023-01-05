class Circle {
    defaultColor: string;
    collisionColor: string;
    radius: number;
    pos: Vector;
    vel: Vector;
    acc: Vector;
    collisionColorTimeActive: number;
    startTime: number;

    colorOffset: number = 40;

    constructor(x: number, y: number, radius: number, color: Color, velocity: Vector = undefined) {
        // When objects collide, the color should change to a lighter
        // version of the given color. The amount lighter is specified
        // by 'colorOffset'
        this.defaultColor = color.rgbString();
        this.collisionColor = color.rgbString(this.colorOffset)
        
        this.radius = radius;
        this.pos = new Vector(x, y);

        // Velocity is an optional parameter
        this.vel = velocity === undefined ? new Vector(sign() * (1 / radius) * 10, sign() * (1 / radius) * 10) : velocity
        
        this.acc = new Vector(0, 0);

        // After two objects collide, this determines how long the object's color is changed for
        this.collisionColorTimeActive = 0.15;
        
        // Subtracting the collision time ensures that the collision
        // color will not be active when the app starts.
        this.startTime = getCurrentTime() - this.collisionColorTimeActive;
    }
    
    /*
    Check for collision between objects and handle resulting velocities.

    Collision logic source: https://github.com/adiman9/pureJSCollisions/blob/master/index.js
    Accompanying Tutorial: https://www.youtube.com/watch?v=XD-7anXSOp0
    */
    checkCollision(other: Circle): boolean {
        if (this !== other) { // Do not check collision with self.
            const v: Vector = Vector.sub(this.pos, other.pos);
            const distance: number = v.magnitude();
            
            if (distance <= this.radius + other.radius) {
                
                this.startTime = getCurrentTime();
                other.startTime = getCurrentTime();
                
                const unitNormal: Vector = Vector.div(v, distance);
                const unitTan: Vector = unitNormal.tan();
                
                // Ensure that collided objects do not get stuck in 
                // each other.
                const correction: Vector = Vector.mul(unitNormal, this.radius + other.radius);
                this.pos = Vector.add(other.pos, correction);
                
                const thisNormal: number = this.vel.dot(unitNormal);
                const otherNormal: number = other.vel.dot(unitNormal);

                const thisTan: number = this.vel.dot(unitTan);
                const otherTan: number = other.vel.dot(unitTan);
                
                const thisScalarVelocity: number = (thisNormal * (this.radius - other.radius) + 
                    2 * other.radius * otherNormal) / (this.radius + other.radius);
                const otherScalarVelocity: number = (otherNormal * (other.radius - this.radius) + 
                    2 * this.radius * thisNormal) / (this.radius + other.radius);
                
                const thisFinalNormal: Vector = Vector.mul(unitNormal, thisScalarVelocity);
                const otherFinalNormal: Vector = Vector.mul(unitNormal, otherScalarVelocity);
                const thisFinalTan: Vector = Vector.mul(unitTan, thisTan);
                const otherFinalTan: Vector = Vector.mul(unitTan, otherTan);
                
                // Update velocities with final velocity.
                this.vel = Vector.add(thisFinalNormal, thisFinalTan);
                other.vel = Vector.add(otherFinalNormal, otherFinalTan);
                
                return true;
            }
        }
        return false;
    }

    isOutsideBounds(): boolean {
        return this.pos.x < 0 || this.pos.x > canvas.width || this.pos.y < 0 || this.pos.y > canvas.width
    }
    
    // Update the position of objects on the canvas. Furthermore, 
    // updating the position to the edge of the canvas upon 
    // collision ensures that objects do not get stuck on the edges 
    // of the canvas or pushed through by other objects.
    // 
    // Multiplying velocity components by -1 changes the direction.
    checkEdges(): void {
        
        // Right side of canvas
        if (this.pos.x + this.radius >= canvas.width) {
            this.startTime = getCurrentTime();
            this.pos.x = canvas.width - this.radius;
            this.vel.x *= -1;
        }
        
        // Left side of canvas
        if (this.pos.x - this.radius <= 0) {
            this.startTime = getCurrentTime();
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        
        // Bottom of canvas
        if (this.pos.y + this.radius >= canvas.height) {
            this.startTime = getCurrentTime();
            this.pos.y = canvas.height - this.radius;
            this.vel.y *= -1;
        }
        
        // Top of canvas
        if (this.pos.y - this.radius <= 0) {
            this.startTime = getCurrentTime();
            this.pos.y = this.radius;
            this.vel.y *= -1;
        }
    }
    
    // Draw the circle on the canvas
    draw(): void {
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        context.lineWidth = 1;

        // Change the color for a few moments after a circle collides with a wall or another circle.
        if (getCurrentTime() - this.startTime >= this.collisionColorTimeActive) {
            context.fillStyle = this.defaultColor;
        } else {
            context.fillStyle = this.collisionColor;
        }

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    // Update the position, velocity, and acceleration of the circle.
    update(): void {
        this.pos = Vector.add(this.pos, this.vel);
        this.vel = Vector.add(this.vel, this.acc);
        this.acc = Vector.mul(this.acc, 0);
    }
}


// Create a circle with random parameters.
class CircleRandom extends Circle {

    constructor(colors: Color[]) {
        // Lower and upper bounds for circle sizes
        let radiusLowerBound: number = 10;
        let radiusUpperBound: number = 30;

        let radius = getRandomFloat(radiusLowerBound, radiusUpperBound);
        
        // Ensure that circle never leaves bounds of canvas.
        let x: number = getRandomFloat(radius, canvas.width - radius);
        let y: number = getRandomFloat(radius, canvas.height - radius);
        let color: Color = colors[getRandomInteger(0, colors.length)];
        
        super(x, y, radius, color);
    }
}


// Bullet object
class Bullet extends Circle {
    constructor(startPos: Vector, endPos: Vector) {
        // Calculate the velocity of the bullet
        // Projectile velocity source (Answer by SpartanDonut):
        // https://gamedev.stackexchange.com/questions/50978/moving-a-sprite-towards-an-x-and-y-coordinate
        let v3: Vector = Vector.sub(endPos, startPos);
        let length: number = v3.magnitude();
        let unit: Vector = Vector.div(v3, length);
        let speed: number = 5;
        let vel: Vector = Vector.mul(unit, speed);
        super(
            endPos.x,
            endPos.y,
            5,
            new Color(244, 229, 65),
            vel
        );    
    }

    checkEdges(): void {
        // Remove bullets when off the bounds of the canvas.
        if (this.pos.x < 0 || this.pos.x > canvas.width ||
            this.pos.y < 0 || this.pos.y > canvas.width) {
            removeCircle(this);
        }
    }
}
