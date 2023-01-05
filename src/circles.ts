let colors = new Array({r: 244, g: 66,  b: 66},  {r: 244, g: 160, b: 65},
                       {r: 244, g: 229, b: 65},  {r: 67,  g: 244, b: 65},
                       {r: 65,  g: 163, b: 244}, {r: 145, g: 65,  b: 244},
                       {r: 244, g: 65,  b: 205});
                       
class Circle {

    defaultColor: string
    collisionColor: string
    radius: number
    pos: Vector
    vel: Vector
    acc: Vector
    collisionColorTimeActive: number
    startTime: number

    constructor(x: number, y: number, radius: number, color, velocity) {
        let colorOffset = 40;
        
        // When objects collide, the color should change to a lighter
        // version of the given color. The amount lighter is specified
        // by 'colorOffset'
        this.defaultColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        this.collisionColor = `rgb(${color.r + colorOffset}, ${color.g + colorOffset}, ${color.b + colorOffset})`;
        
        this.radius = radius;
        this.pos = new Vector(x, y);
        
        // Velocity is an optional parameter
        if (velocity === undefined) {
            this.vel = new Vector(
                sign() * (1 / radius) * 10,
                sign() * (1 / radius) * 10
            );
        } else {
            this.vel = velocity;
        }
        
        this.acc = new Vector(0, 0);

        this.collisionColorTimeActive = 0.15;
        
        // Subtracting the collision time ensures that the collision
        // color will not be active when the app starts.
        this.startTime = getCurrentTime() - this.collisionColorTimeActive;
    }
    
    // Check for collision between objects and handle resulting
    // velocities.
    //
    // Collision logic source:
    // https://github.com/adiman9/pureJSCollisions/blob/master/index.js
    // 
    // Accompanying Tutorial: 
    // https://www.youtube.com/watch?v=XD-7anXSOp0
    checkCollision(other: Circle): boolean {
        if (this !== other) { // Do not check collision with self.
            const v = Vector.sub(this.pos, other.pos);
            const distance = v.magnitude();
            
            if (distance <= this.radius + other.radius) {
                
                this.startTime = getCurrentTime();
                other.startTime = getCurrentTime();
                
                const unitNormal = Vector.div(v, distance);
                const unitTan = unitNormal.tan();
                
                // Ensure that collided objects do not get stuck in 
                // each other.
                const correction = Vector.mul(unitNormal, this.radius + other.radius);
                this.pos = Vector.add(other.pos, correction);
                
                const thisNormal = this.vel.dot(unitNormal);
                const otherNormal = other.vel.dot(unitNormal);

                const thisTan = this.vel.dot(unitTan);
                const otherTan = other.vel.dot(unitTan);
                
                const thisScalarVelocity = (thisNormal * (this.radius - other.radius) + 
                    2 * other.radius * otherNormal) / (this.radius + other.radius);
                const otherScalarVelocity = (otherNormal * (other.radius - this.radius) + 
                    2 * this.radius * thisNormal) / (this.radius + other.radius);
                
                const thisFinalNormal = Vector.mul(unitNormal, thisScalarVelocity);
                const otherFinalNormal = Vector.mul(unitNormal, otherScalarVelocity);
                const thisFinalTan = Vector.mul(unitTan, thisTan);
                const otherFinalTan = Vector.mul(unitTan, otherTan);
                
                // Update velocities with final velocity.
                this.vel = Vector.add(thisFinalNormal, thisFinalTan);
                other.vel = Vector.add(otherFinalNormal, otherFinalTan);
                
                return true;
            }
        }
        return false;
    }
    
    // Update the position of objects on the canvas. Furthermore, 
    // updating the position to the edge of the canvas upon 
    // collision ensures that objects do not get stuck on the edges 
    // of the canvas or pushed through by other objects.
    // 
    // Multiplying velocity components by -1 changes the direction.
    checkEdges() {
        
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
    draw() {
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        context.lineWidth = 1;
        if (getCurrentTime() - this.startTime >= this.collisionColorTimeActive) {
            context.fillStyle = this.defaultColor;
        } else {
            context.fillStyle = this.collisionColor;
        }

        context.closePath();
        context.fill();
        context.stroke();
    }
    
    // Remove a circle object from the array of circles.
    remove() {
        let index = circles.indexOf(this);
        circles.splice(index, 1);
    }
    
    // Update the position, velocity, and acceleration of the circle.
    update() {
        this.pos = Vector.add(this.pos, this.vel);
        this.vel = Vector.add(this.vel, this.acc);
        this.acc = Vector.mul(this.acc, 0);
    }
}


// Create a circle with random parameters.
class CircleRandom extends Circle {
    constructor(rLow, rHigh) {
        let radius = getRandomFloat(rLow, rHigh);
        
        // Ensure that circle never leaves bounds of canvas.
        let x = getRandomFloat(radius, canvas.width - radius);
        let y = getRandomFloat(radius, canvas.height - radius);
        let color = colors[getRandomInteger(0, colors.length)];
        super(x, y, radius, color, undefined);
    }
}


// Bullet object
class Bullet extends Circle {
    constructor(v1, v2) {
        // Calculate the velocity of the bullet
        // Projectile velocity source (Answer by SpartanDonut):
        // https://gamedev.stackexchange.com/questions/50978/moving-a-sprite-towards-an-x-and-y-coordinate
        let v3 = Vector.sub(v2, v1);
        let length = v3.magnitude();
        let unit = Vector.div(v3, length);
        let speed = 5;
        let vel = Vector.mul(unit, speed);
        super(v2.x, v2.y, 5, {r: 244, g: 229, b: 65}, vel);    
    }

    // If a bullet collides with another object, both objects are
    // removed.
    checkCollision(other: Circle): boolean {
        if (super.checkCollision(other)) {
            other.remove();
            score += 1;
            scoreBoard.innerHTML = `Score: ${score}`;
            return true
        }
        return false
    }

    checkEdges() {
        // Remove bullets when off the bounds of the canvas.
        if (this.pos.x < 0 || this.pos.x > canvas.width ||
            this.pos.y < 0 || this.pos.y > canvas.width) {
            this.remove();
        }
    }
}
