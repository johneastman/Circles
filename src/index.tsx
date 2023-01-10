import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Vector } from "./circles/vector";
import { Color } from "./circles/color";
import { Circle, CircleRandom, Bullet } from "./circles/circles";
import { Turret } from "./circles/turret";

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

const scoreBoard = document.getElementById("scoreBoard") as unknown as HTMLElement;
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
    let bullet = new Bullet(canvas.width, canvas.height, startPos, endPos);

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

const context: CanvasRenderingContext2D = canvas.getContext("2d") as unknown as CanvasRenderingContext2D;

/* 
The turret needs to be defined after the canvas is initiated/setup because the turret
uses the canvas width and height for its own setup.
*/
const turret: Turret = new Turret(canvas.width, canvas.height);

function createCircle(): void {
    let c = new CircleRandom(canvas.width, canvas.height, colors);
    circles.push(c);
}

function removeCircle(circle: Circle): void {
    let index: number = circles.indexOf(circle);
    circles.splice(index, 1);
}

// Set the player's score
export function setScore(value: number): void {
    score = value;
    scoreBoard.innerHTML = `Score: ${score}`;
}

// Change the player's score by a given value
export function updateScore(value: number): void {
    setScore(score + value);
}

// Continually add circles at given intervals (note: units for "interval" are milliseconds)
export function addCirclesAtInterval(interval: number = 1000): void {
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
    setScore(0);
}

function mainLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {

        circle.checkEdges();

        for (let c of circles) {
            c.checkCollision(circle);
        }
        
        circle.update();
        circle.draw(context);
    }
    turret.draw(context);
    
    requestAnimationFrame(mainLoop);
}

// Main logic starts here
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Game logic starts here
startGame();
requestAnimationFrame(mainLoop);
