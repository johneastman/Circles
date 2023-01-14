import App from "../components/app/App";
import { Bullet } from "./circles";
import { Sprite } from "./sprite";
import { Vector } from "./vector";

export class Turret implements Sprite {
    radius: number = 20;
    turretLength: number = 50;
    barrelStart: Vector;
    barrelEnd: Vector;

    mode: string;

    /*
    position: where to place the turret. This will be the (x, y) position for the base of the turret.
    */
    constructor(position: Vector) {        
        this.barrelStart = position;
        this.barrelEnd = new Vector(position.x, position.y - this.turretLength);
        this.mode = "DEFAULT";
    }

    draw(context: CanvasRenderingContext2D): void {        
        // Turret barrel (the part that follows the mouse)
        context.beginPath();
        context.moveTo(this.barrelStart.x, this.barrelStart.y);
        context.lineTo(this.barrelEnd.x, this.barrelEnd.y);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();

        // first two parameters to arc: (x, y) position of centerpoint for arc
        context.beginPath();
        context.arc(this.barrelStart.x, this.barrelStart.y, this.radius, 0, Math.PI, true);
        context.lineWidth = 1;
        context.fillStyle = "black";
        context.closePath();
        context.fill();
        context.stroke();
    }

    // Update where the turret barrel to always point toward the mouse
    update(mousePosVector: Vector): void {
        this.barrelEnd = Vector.distanceFrom(this.barrelStart, mousePosVector, this.turretLength)
    }

    setMode(key: string) {
        switch(key) {
            case "1":
                this.mode = "DEFAULT";
                break;

            case "2":
                this.mode = "MANY";
                break;
            
            default:
                this.mode = "DEFAULT";
                break;
        }
    }

    getBullets(app: App): Bullet[] {
        let bullets: Bullet[] = [];

        let bullet: Bullet = new Bullet(app, this.barrelStart, this.barrelEnd);
        bullets.push(bullet);

        if (this.mode === "MANY") {
            /*
            Calculate third point of right triangle with 2 points and a known distance:
            https://math.stackexchange.com/a/2126315
            */
            let x1: number = this.barrelStart.x;
            let x2: number = this.barrelEnd.x;
    
            let y1: number = this.barrelStart.y;
            let y2: number = this.barrelEnd.y;
    
            let L: number = this.barrelStart.distance(this.barrelEnd);
            let c: number = 8;
    
            let xOffset: number = (c * (y1 - y2)) / L;
            let yOffset: number = (c * (x2 - x1)) / L;
    
            let left: Vector = new Vector(x2 + xOffset, y2 + yOffset);
            let right: Vector = new Vector(x2 - xOffset, y2 - yOffset);

            bullets.push(new Bullet(app, this.barrelStart, left));
            bullets.push(new Bullet(app, this.barrelStart, right));
        }
        return bullets;
    }
}