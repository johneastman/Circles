import React from "react";

class Canvas extends React.Component<{
        width: number,
        height: number,
        onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
        onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
    },
    {}> {

    canvasReference: React.RefObject<Canvas>;

    constructor(props: { width: number; height: number; onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void; onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void; } | Readonly<{ width: number; height: number; onClick: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void; onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void; }>) {
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