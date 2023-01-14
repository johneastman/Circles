import React from "react";

import "./App.css";
import { Circle, TargetCircle, Bullet } from "../../sprites/circles";
import { Vector } from "../../game/vector";
import { Turret } from "../../sprites/turret";
import { getRandomColor } from  "../../game/util";
import { Color } from "../../game/color";
import Canvas from '../canvas/Canvas';
import { HighScores } from "../highScores/HighScores";

interface AppState {
    score: number;
    circles: Circle[];
    turret: Turret;
    isPaused: boolean; // for pausing/unpausing the game
}

class App extends React.Component<{}, AppState> {
    
    canvasWidth: number;
    canvasHeight: number;
    numCircles: number;
    canvasRef: React.RefObject<Canvas>;
    highScoreRef: React.RefObject<HighScores>;

    constructor(props: {}) {
        super(props);

        this.canvasWidth = 400;
        this.canvasHeight = 300;
        this.numCircles = 8;

        this.state = {
            score: 0,
            circles: this.createCircles(),
            turret: new Turret(
                new Vector(this.canvasWidth / 2, this.canvasHeight)
            ),
            isPaused: false
        };

        this.canvasRef = React.createRef();
        this.highScoreRef = React.createRef();
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <div className="menu">
                    <ul>
                        <li>Score: { this.state.score }</li>
                        <li><button onClick={this.resetGame.bind(this)}>Reset Game</button></li>
                        <li>
                            <button
                                /*
                                The play/pause button needs to be disabled when the end-game state is reached because if
                                the user clicks play, the game will immediately unpause, but because there are no objects
                                in "this.state.circles", the game will immediately pause again and continually add the same
                                score to the high-score component.

                                If the player wants to play another round, they'll have to click "Reset Game".
                                */
                                disabled={this.state.circles.length === 0}
                                onClick={this.pauseGame.bind(this)}>{this.state.isPaused ? "Play" : "Pause"}
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="gameWrapper" /* Position div right of center div: http://jsfiddle.net/1Lrph45y/4/ */ >
                    <div className="center">
                        <Canvas
                            ref={this.canvasRef}
                            width={this.canvasWidth}
                            height={this.canvasHeight}
                            onClick={this.fireBullet.bind(this)}
                            onMouseMove={this.turretFollowMouse.bind(this)}
                        />
                    </div>
                    <div className="scoreBoardFloating">
                        <div className="scoreBoard">
                            <HighScores ref={this.highScoreRef} numTopScores={3} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keydown", this.changeTurretMode.bind(this));
        this.mainLoop();
    }

    componentDidUpdate() {
        if (!this.state.isPaused && this.state.circles.length === 0) {
            this.highScoreRef.current?.addScore(this.state.score);

            // Pause the game so the score is not continually added to the high-score board
            this.setState({isPaused: true});
        }
    }

    // Make the turret follow the player's mouse
    turretFollowMouse(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
        let rect: DOMRect = this.canvasRef.current!.getBoundingClientRect();
        let mouseVector: Vector = new Vector(e.clientX - rect.left, e.clientY - rect.top);

        let turret: Turret = this.state.turret;
        turret.update(mouseVector);
        this.setState({turret: turret});
    }

    changeTurretMode(keyboardEvent: KeyboardEvent): void {
        let turret: Turret = this.state.turret;
        turret.setMode(keyboardEvent.key);
        this.setState({turret: turret});
    }

    // Fire a bullet when the user clicks on the canvas
    fireBullet(_: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
        let turret: Turret = this.state.turret;

        let bullets: Bullet[] = turret.getBullets(this);
        
        let circles: Circle[] = this.state.circles;
        circles = circles.concat(bullets);
        this.setState({circles: circles});
    }

    resetGame(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({
            score: 0,
            circles: this.createCircles(),
            isPaused: false
        });
    }

    pauseGame(_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({isPaused: !this.state.isPaused});
    }

    mainLoop() {
        if (!this.state.isPaused) {
            let canvas: Canvas | null = this.canvasRef.current;
            if (canvas != null && canvas.state != null) {
                canvas.clear();
    
                let circles: Circle[] = this.state.circles;
                for (let i = 0; i < circles.length; i++) {
                    const current: Circle = circles[i];
    
                    /*
                    Check collisions with the circles after the current circle in the array. Collisions with circles before the
                    current circle in the array do not need to be checked due to the commutative property (e.g., if A collides
                    with B, then B has, in a sense, collided with A).
                    */
                    const rest: Circle[] = circles.slice(i + 1);
    
                    for (let circle of rest) {
                        circle.checkCollision(current);
                    }
    
                    current.checkEdges(); // Handle how circles respond at the edges of the canvas
                    current.update();
                    canvas.draw(current);
                }
                canvas.draw(this.state.turret);
            }
        }

        requestAnimationFrame(this.mainLoop.bind(this));
    }

    createCircles(): Circle[] {
        let circles: Circle[] = [];
        for (let i = 0; i < this.numCircles; i++) {
            let color: Color = getRandomColor();
            let circle = new TargetCircle(this, color);
            circles.push(circle);
        }
        return circles;
    }

    removeCircle(circle: Circle): void {
        let circles: Circle[] = this.state.circles;

        let index: number = circles.indexOf(circle);
        circles.splice(index, 1);

        this.setState({circles: circles});
    }

    updateScore(bullet: Bullet): void {
        this.setState({score: this.state.score + bullet.scoreMultiplier});
    }
}

export default App;
