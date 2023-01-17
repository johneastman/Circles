import { Sprite } from "./sprite";

export class Text implements Sprite {

    text: string;
    x: number;
    y: number;
    font: string
    fontSize: number;
    
    constructor(text: string, x: number, y: number, font: string = "serif", fontSize: number = 48) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
    }
    
    draw(context: CanvasRenderingContext2D): void {
        context.font = `${this.fontSize}px ${this.font}`;

        // Good resource on textAlign: https://www.w3schools.com/tags/canvas_textalign.asp
        context.textAlign = "center";
        context.fillText(this.text, this.x, this.y);
    }
}