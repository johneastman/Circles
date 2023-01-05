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

// Lower and upper bounds for circle sizes
const radiusLower: number = 10;
const radiusHigher: number = 30;

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
    let c = new CircleRandom(radiusLower, radiusHigher, colors);
    circles.push(c);
}

function addCirclesAtInterval(interval: number = 1000): void {
    // Continually add circles at given intervals (note: units for "interval" are milliseconds)
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

    // Display the player's score
    scoreBoard.innerHTML = `Score: ${score}`;
}

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

// Main logic starts here
startGame()
requestAnimationFrame(mainLoop);
