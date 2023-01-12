import React from "react";
import './Canvas.css';
import { Sprite } from "../circles/sprite";

interface CanvasProps {
    width: number
    height: number
    onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
}

interface CanvasState {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
}

class Canvas extends React.Component<CanvasProps, CanvasState> {

    htmlRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: CanvasProps) {
        super(props);

        this.htmlRef = React.createRef();
    }

    componentDidMount(): void {
        let canvas: HTMLCanvasElement = this.htmlRef.current!;
        let context: CanvasRenderingContext2D = canvas.getContext("2d")!;

        this.setState({
            canvas: canvas,
            context: context
        });
    }

    getBoundingClientRect(): DOMRect {
        return this.state.canvas.getBoundingClientRect();
    }

    clear(): void {
        this.state.context.clearRect(0, 0, this.props.width, this.props.height);
    }

    draw(sprite: Sprite): void {
        sprite.draw(this.state.context);
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
}

export default Canvas;
