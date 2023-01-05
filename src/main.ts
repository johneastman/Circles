var score: number = 0;
var circles: Circle[] = new Array();

const numCircles: number = 7;

let colors: Color[] = new Array(
    new Color(244, 66, 66),
    new Color(244, 160, 65),
    new Color(244, 229, 65),
    new Color(67, 244, 65),
    new Color(65, 163, 244),
    new Color(145, 65, 244),
    new Color(244, 65, 205),
);

const scoreBoard: HTMLElement = document.getElementById("scoreBoard");
scoreBoard.innerHTML = `Score: ${score}`;

// Always point the turret toward the mouse
const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.addEventListener("mousemove", function(e: MouseEvent): void {
    let rect: DOMRect = canvas.getBoundingClientRect();
    let mouseVector: Vector = new Vector(e.clientX - rect.left, e.clientY - rect.top);
    turret.update(mouseVector);
});

// Fire a bullet from the turret when the user clicks the canvas
canvas.addEventListener("click", function(e: MouseEvent): void {
    let startPos: Vector = new Vector(turret.turretStart.x, turret.turretStart.y);
    let endPos: Vector = new Vector(turret.turretEnd.x, turret.turretEnd.y);    
    let bullet = new Bullet(startPos, endPos);

    circles.push(bullet);
});

// Reset Game Button
const resetButton: HTMLButtonElement = document.getElementById("reset_game") as HTMLButtonElement;
resetButton.onclick = function(e: MouseEvent) {

    // Ensure there are no circles remaining
    circles = []
    score = 0;

    startGame();
};

const context: CanvasRenderingContext2D = canvas.getContext("2d");

/* 
The turret needs to be defined after the canvas is initiated/setup because the turret
uses the canvas width and height for its own setup.
*/
const turret: Turret = new Turret(canvas.width, canvas.height);

function createCircle(): void {
    let c = new CircleRandom(colors);
    circles.push(c);
}

function removeCircle(circle: Circle): void {
    let index: number = circles.indexOf(circle);
    circles.splice(index, 1);
}

// Set the player's score
function setScore(value: number): void {
    score = value;
    scoreBoard.innerHTML = `Score: ${score}`;
}

// Change the player's score by a given value
function updateScore(value: number): void {
    setScore(score + value);
}

// Continually add circles at given intervals (note: units for "interval" are milliseconds)
function addCirclesAtInterval(interval: number = 1000): void {
    setInterval(function() {
        if (circles.length < 25) {
            createCircle();
        }
    }, interval);
}

function startGame(): void {

    // Add circles to the game
    for (let i = 0; i < numCircles; i++) {
        createCircle();
    }

    setScore(0)
}

function checkCollisions(circle: Circle, circles: Circle[]): void {
    for (let c of circles) {
        let isCollide: boolean = c.checkCollision(circle);
        
        if (isCollide && c instanceof Bullet) {
            updateScore(1)
            removeCircle(circle);
        }
    }
}

function mainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {

        circle.checkEdges();
        checkCollisions(circle, circles);
        
        circle.update();
        circle.draw();
    }
    turret.draw();
    
    requestAnimationFrame(mainLoop);
}

// Main logic starts here
startGame();
requestAnimationFrame(mainLoop);
