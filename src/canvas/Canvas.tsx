import React from "react";
import './Canvas.css';

interface CanvasProps {
    width: number
    height: number
    onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
}

class Canvas extends React.Component<CanvasProps, {}> {

    canvasReference: React.RefObject<Canvas>;

    constructor(props: CanvasProps) {
      super(props);

      this.canvasReference = React.createRef();
    }

    render() {
        return (
        <canvas
            id="canvas"
            width={this.props.width}
            height={this.props.height}
            onClick={this.props.onClick}
            onMouseMove={this.props.onMouseMove}
        ></canvas>
        );
    }
}

export default Canvas;