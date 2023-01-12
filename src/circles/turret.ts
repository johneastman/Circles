import Canvas from "../canvas/Canvas";
import { Sprite } from "./sprite";
import { Vector } from "./vector";

export class Turret implements Sprite {
    radius: number = 20;
    turretLength: number = 50;
    barrelStart: Vector;
    barrelEnd: Vector;

    /*
    position: where to place the turret. This will be the (x, y) position for the base of the turret.
    */
    constructor(position: Vector) {        
        this.barrelStart = position;
        this.barrelEnd = new Vector(position.x, position.y - this.turretLength);
    }

    draw(context: CanvasRenderingContext2D): void {        
        context.beginPath();

        // first two parameters to arc: (x, y) position of centerpoint for arc
        context.arc(this.barrelStart.x, this.barrelStart.y, this.radius, 0, Math.PI, true);
        context.lineWidth = 1;
        context.fillStyle = "black";
        context.fill();
        context.stroke();

        // Turret barrel (the part that follows the mouse)
        context.beginPath();
        context.moveTo(this.barrelStart.x, this.barrelStart.y);
        context.lineTo(this.barrelEnd.x, this.barrelEnd.y);
        context.lineWidth = 5;
        context.stroke();
    }

    // Update where the turret barrel to always point toward the mouse
    update(mousePosVector: Vector): void {
        this.barrelEnd = Vector.distanceFrom(this.barrelStart, mousePosVector, this.turretLength)
    }
}