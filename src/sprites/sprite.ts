// Sprite is anything drawn on the canvas
export interface Sprite {
    draw: (context: CanvasRenderingContext2D) => void;
}
