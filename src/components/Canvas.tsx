import React from "react";
import './Canvas.css';
import { Sprite } from "../sprites/sprite";

interface CanvasProps {
    width: number;
    height: number;
    sprites: Sprite[];
    onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

class Canvas extends React.Component<CanvasProps, {}> {

    htmlRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: CanvasProps) {
        super(props);

        this.htmlRef = React.createRef();
    }

    render() {
        return (
            <canvas
                className="canvas"
                ref={this.htmlRef}
                width={this.props.width}
                height={this.props.height}
                onClick={this.props.onClick}
                onMouseMove={this.props.onMouseMove}
            ></canvas>
        );
    }

    componentDidMount(): void {
        // constantly rerender the canvas so circles are always moving on the screen
        setInterval(() => { this.forceUpdate() }, 1);
    }

    componentDidUpdate(): void {
        let canvas: HTMLCanvasElement = this.htmlRef.current!;
        let context: CanvasRenderingContext2D = canvas.getContext("2d")!;

        context.clearRect(0, 0, this.props.width, this.props.height);
        for (let s of this.props.sprites) {
            s.draw(context);
        }
    }
}

export default Canvas;
