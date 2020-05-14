const canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseVector = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    turret.update(mouseVector);
});

canvas.addEventListener("click", function(e) {
    let start = new Vector(turret.turretStart.x, turret.turretStart.y);
    let end = new Vector(turret.turretEnd.x, turret.turretEnd.y);
        
    // Calculate velocity of the bullet
    let speed = 5;
    let v3 = Vector.sub(end, start);
    let length = v3.magnitude();
    let unit = Vector.div(v3, length);
    let vel = Vector.mul(unit, speed);
    
    let bullet = new Bullet(start, end);
    
    //let bullet = new Bullet(start, end);
    circles.push(bullet);
});

const context = canvas.getContext("2d");

var score = 0;
const scoreBoard = document.getElementById("scoreBoard");
scoreBoard.innerHTML = `Score: ${score}`;

function createCircles() {
    for (let i = 0; i < 7; i++) {
        createCircle();
    }
}

function createCircle() {
    let c = new CircleRandom(radiusLower, radiusHigher);
    circles.push(c);
}

const turret = new Turret();
const radiusLower = 10;
const radiusHigher = 30;

var circles = new Array();
createCircles();

function mainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
        circle.checkEdges();
        for (let i = 0; i < circles.length; i++) {
            const current = circles[i];
            for (let c of circles.slice(i + 1)) {
                c.checkCollision(current);
            }
        }
        circle.update();
        circle.draw();
    }
    turret.draw();
    
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);
/*
setInterval(function() {
    if (circles.length < 25) {
        createCircle();
    }
}, 1000);
*/