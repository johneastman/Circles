import { Color } from "../game/color";
import { Vector } from "../game/vector";
import { sign, getCurrentTime, getRandomFloat } from "../game/util"
import App from "../components/app/App";
import { Sprite } from "./sprite";

export class Circle implements Sprite {
    canvasWidth: number;
    canvasHeight: number;
    defaultColor: string;
    collisionColor: string;
    radius: number;
    mass: number;
    pos: Vector;
    vel: Vector;
    acc: Vector;
    collisionColorTimeActive: number;
    startTime: number;
    app: App;

    colorOffset: number = 40;

    constructor(
        app: App,
        x: number,
        y: number,
        radius: number,
        mass: number,
        color: Color,
        velocity: Vector | undefined = undefined) {
        
        this.app = app;
        this.canvasWidth = app.canvasWidth;
        this.canvasHeight = app.canvasHeight;
        
        /*
        When objects collide, the color should change to a lighter version of the given color. The amount lighter is specified
        by 'colorOffset'.
        */
        this.defaultColor = color.rgbString();
        this.collisionColor = color.rgbString(this.colorOffset)
        
        this.radius = radius;
        this.mass = mass;
        
        this.pos = new Vector(x, y);

        // Velocity is an optional parameter
        this.vel = velocity || new Vector(sign() * (1 / radius) * 10, sign() * (1 / radius) * 10);
        
        this.acc = new Vector(0, 0);

        // After two objects collide, this determines how long the object's color is changed for
        this.collisionColorTimeActive = 0.15;
        
        // Subtracting the collision time ensures that the collision
        // color will not be active when the app starts.
        this.startTime = getCurrentTime() - this.collisionColorTimeActive;
    }

    /**
     * Check if two circle objects have collided. If the distance between the two circles' centers is less
     * than or equal to the sum of the radii, the circles have collided.
     * 
     * @param other another Circle instance
     * @returns boolean. True if the two circles have collided; false otherwise.
     */
    collidedWith(other: Circle): boolean {
        return this !== other && this.pos.distance(other.pos) <= this.radius + other.radius;
    }


    /**
     * Update circles' velocities after a collision has occurred ("collidedWith" checks if the circles have collided.)
     *  
     * Collision logic source: https://github.com/adiman9/pureJSCollisions/blob/master/index.js
     * Accompanying Tutorial: https://www.youtube.com/watch?v=XD-7anXSOp0
     * 
     * @param other another Circle object
     */
    collisionUpdate(other: Circle): void {
        this.startTime = getCurrentTime();
        other.startTime = getCurrentTime();

        const diffVec: Vector = Vector.sub(this.pos, other.pos);
        const distance: number = diffVec.magnitude();
        
        const unitNormal: Vector = Vector.div(diffVec, distance);
        const unitTan: Vector = unitNormal.tan();
        
        // Ensure that collided objects do not get stuck in each other.
        const correction: Vector = Vector.mul(unitNormal, this.radius + other.radius);
        this.pos = Vector.add(other.pos, correction);
        
        const thisNormal: number = this.vel.dot(unitNormal);
        const otherNormal: number = other.vel.dot(unitNormal);

        const thisTan: number = this.vel.dot(unitTan);
        const otherTan: number = other.vel.dot(unitTan);
        
        const thisScalarVelocity: number = (thisNormal * (this.mass - other.mass) + 
            2 * other.mass * otherNormal) / (this.mass + other.mass);
        
        const otherScalarVelocity: number = (otherNormal * (other.mass - this.mass) + 
            2 * this.mass * thisNormal) / (this.mass + other.mass);
        
        const thisFinalNormal: Vector = Vector.mul(unitNormal, thisScalarVelocity);
        const otherFinalNormal: Vector = Vector.mul(unitNormal, otherScalarVelocity);
        const thisFinalTan: Vector = Vector.mul(unitTan, thisTan);
        const otherFinalTan: Vector = Vector.mul(unitTan, otherTan);
        
        // Update velocities with final velocity.
        this.vel = Vector.add(thisFinalNormal, thisFinalTan);
        other.vel = Vector.add(otherFinalNormal, otherFinalTan);
    }
    
    /*
    Update the position of objects on the canvas. Furthermore, 
    updating the position to the edge of the canvas upon 
    collision ensures that objects do not get stuck on the edges 
    of the canvas or pushed through by other objects.
    
    Multiplying velocity components by -1 changes the direction.
    */
    checkEdges(): void {
        
        // Right side of canvas
        if (this.pos.x + this.radius >= this.canvasWidth) {
            this.startTime = getCurrentTime();
            this.pos.x = this.canvasWidth - this.radius;
            this.vel.x *= -1;
        }
        
        // Left side of canvas
        if (this.pos.x - this.radius <= 0) {
            this.startTime = getCurrentTime();
            this.pos.x = this.radius;
            this.vel.x *= -1;
        }
        
        // Bottom of canvas
        if (this.pos.y + this.radius >= this.canvasHeight) {
            this.startTime = getCurrentTime();
            this.pos.y = this.canvasHeight - this.radius;
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
    draw(context: CanvasRenderingContext2D): void {
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
export class TargetCircle extends Circle {

    constructor(app: App, color: Color) {
        // Lower and upper bounds for circle sizes
        let radiusLowerBound: number = 10;
        let radiusUpperBound: number = 30;

        let radius = getRandomFloat(radiusLowerBound, radiusUpperBound);
        
        // Ensure that circle never leaves bounds of canvas.
        let x: number = getRandomFloat(radius, app.canvasWidth - radius);
        let y: number = getRandomFloat(radius, app.canvasHeight - radius);
        
        super(app, x, y, radius, radius, color);
    }
}


// Bullet object
export class Bullet extends Circle {

    /*
    Every time a bullet hits a target, increment this value by 1, and increment the player's score
    by this value. This rewards the player for hitting multiple targets with the same bullet.
    */
    scoreMultiplier: number = 0

    constructor(app: App, startPos: Vector, endPos: Vector) {
        /*
        Calculate the velocity of the bullet based on where the turret is pointing
        
        Projectile velocity source: https://gamedev.stackexchange.com/a/50983
        */
        let diffVec: Vector = Vector.sub(endPos, startPos);
        let length: number = diffVec.magnitude();
        let unit: Vector = Vector.div(diffVec, length);
        let speed: number = 3;
        let vel: Vector = Vector.mul(unit, speed);

        super(
            app,
            endPos.x,
            endPos.y,
            5,
            5,
            new Color(244, 229, 65),
            vel
        );    
    }

    checkEdges(): void {
        // Remove bullets when off the bounds of the canvas.
        if (this.pos.x + this.radius < 0 || this.pos.x - this.radius > this.canvasWidth ||
            this.pos.y + this.radius < 0 || this.pos.y - this.radius > this.canvasHeight) {
            this.app.removeBullet(this);
        }
    }

    collisionUpdate(other: Circle): void {
        super.collisionUpdate(other); // Physics udates to bullet

        if (!(other instanceof Bullet)) {
            this.scoreMultiplier += 1;
            this.app.updateScore(this);
            this.app.removeCircle(other);
        }
    }
}
