import { Color } from "./color";


export let colors: Color[] = new Array(
    new Color(244, 66, 66),
    new Color(244, 160, 65),
    new Color(244, 229, 65),
    new Color(67, 244, 65),
    new Color(65, 163, 244),
    new Color(145, 65, 244),
    new Color(244, 65, 205),
);


// Return time since epoch in seconds.
export function getCurrentTime(): number {
    let date: Date = new Date();
    return date.getTime() / 1000;
}

// Return a random floating-point number within a specified range.
// Inclusive of min; inclusive of max.
export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}

// Return a random integer within a specified range.
// Inclusive of min; exclusive of max.
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Return positive or negative one.
export function sign(): number {
    return Math.random() < 0.5 ? -1 : 1;
}
