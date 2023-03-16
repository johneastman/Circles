import App from "../components/app/App";
import { BouncerBullet, Bullet, SplitterBullet } from "./circles";
import { Sprite } from "./sprite";
import { Vector } from "../game/vector";
import { Mode } from "../components/turret_mode/TurretMode";

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

    getBullets(app: App, turretMode: {key: string, displayName: string}): Bullet[] {
        let bullets: Bullet[];

        switch (turretMode) {
            case Mode.ARRAY:
                let perpendicularPoints: Vector[] = Vector.perpendicularTo(this.barrelStart, this.barrelEnd, 8);
                let left: Vector = perpendicularPoints[0];
                let right: Vector = perpendicularPoints[1];
    
                bullets = [
                    new Bullet(app, this.barrelStart, this.barrelEnd),
                    new Bullet(app, this.barrelStart, left),
                    new Bullet(app, this.barrelStart, right)
                ];
                break;
            case Mode.BURST:
                bullets = [new SplitterBullet(app, this.barrelStart, this.barrelEnd)];
                break;
            case Mode.BOUNCE:
                bullets = [new BouncerBullet(app, this.barrelStart, this.barrelEnd)];
                break;
            default:
                bullets = [new Bullet(app, this.barrelStart, this.barrelEnd)];
                break;
        }
        return bullets;
    }
}