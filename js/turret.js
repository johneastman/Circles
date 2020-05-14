class Turret {
    constructor() {
        this.radius = 20;
        this.turretLength = 50;
        
        this.turretStart = new Vector(canvas.width / 2, canvas.height);
        this.turretEnd = new Vector(canvas.width / 2, canvas.height - this.turretLength);
    }
    
    draw() {
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height, this.radius, 0, Math.PI, true);
        context.lineWidth = 1;
        context.fillStyle = "black";
        context.fill();
        context.stroke();
        
        // Turret cannon (the part that follows the mouse)
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height);
        context.lineTo(this.turretEnd.x, this.turretEnd.y);
        context.lineWidth = 5;
        context.stroke();
    }
    
    // Update where the turret is pointing based on the mouse position.
    update(v2) {
        this.turretEnd = Vector.distanceFrom(this.turretStart, v2, this.turretLength)
    }
}