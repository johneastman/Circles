import { GameMode } from "../components/GameMode";
import { Color } from "./color";


export let colors: Color[] = [
    new Color(244, 66, 66),
    new Color(244, 160, 65),
    new Color(244, 229, 65),
    new Color(67, 244, 65),
    new Color(65, 163, 244),
    new Color(145, 65, 244),
    new Color(244, 65, 205),
];


// Return time since epoch in seconds.
export function getCurrentTime(): number {
    let date: Date = new Date();
    return date.getTime() / 1000;
}

// Return a random floating-point number within a specified range.
// Inclusive of min; inclusive of max.
export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Return a random integer within a specified range.
// Inclusive of min; exclusive of max.
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Return positive or negative one.
export function sign(): number {
    return percentChance(0.5) ? -1 : 1;
}

export function getRandomColor() {
    return colors[getRandomInteger(0, colors.length)];
}

export function percentChance(percent: number): boolean {
    return Math.random() < percent;
}

export function ordinal(n: number): string {
    let suffix: string;
    if (n % 100 >= 11 && n % 100 <= 13) {
        // If the number ends with the digits 11, 12, or 13, the suffix is "th" (11th, 12th, 13th, 111th, 112th, 113th, etc).
        suffix = "th";
    } else {
        /**
         * With the exception of 11, 12, and 13:
         *   - Numbers that end in 0: "th" (e.g., 0th, 10th, 100th, 1000th, etc.)
         *   - Numbers that end in 1: "st" (e.g., 1st, 101st, 1001st, etc.)
         *   - Numbers that end in 2: "nd" (e.g., 2nd, 102nd, 1002nd, etc.)
         *   - Numbers that end in 3: "rd" (e.g., 3rd, 103rd, 1003rd, etc.)
         *   - Numbers that end in 4 - 9: "th" (e.g., 4th, 5th, 6th, 7th, 8th, 9th, 104th, 105th, etc.)
         */
        suffix = ['th', 'st', 'nd', 'rd', 'th'][Math.min(n % 10, 4)]
    }
    return `${n}${suffix}`;
}

export function getScore(score: number, gameMode: GameMode): string {

    if (gameMode === GameMode.QUICK_DRAW) {
        let minutes: string = ("0" + Math.floor((score / 60000) % 60)).slice(-2);
        let seconds: string = ("0" + Math.floor((score / 1000) % 60)).slice(-2);
        let milliseconds: string = ("0" + ((score / 10) % 100)).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    // GameMode.PRECISION_SHOT
    return `${score}`;
}