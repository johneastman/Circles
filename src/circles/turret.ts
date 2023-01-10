import { Vector } from "./vector";

export class Turret {

    radius: number = 20;
    turretLength: number = 50;
    turretStart: Vector;
    turretEnd: Vector;
    canvasWidth: number
    canvasHeight: number

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        
        this.turretStart = new Vector(this.canvasWidth / 2, this.canvasHeight);
        this.turretEnd = new Vector(this.canvasWidth / 2, this.canvasHeight - this.turretLength);
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.canvasWidth / 2, this.canvasHeight, this.radius, 0, Math.PI, true);
        context.lineWidth = 1;
        context.fillStyle = "black";
        context.fill();
        context.stroke();
        
        // Turret cannon (the part that follows the mouse)
        context.beginPath();
        context.moveTo(this.canvasWidth / 2, this.canvasHeight);
        context.lineTo(this.turretEnd.x, this.turretEnd.y);
        context.lineWidth = 5;
        context.stroke();
    }

    // Update where the turret is pointing based on the mouse position.
    update(mousePosVector: Vector): void {
        this.turretEnd = Vector.distanceFrom(this.turretStart, mousePosVector, this.turretLength)
    }
}