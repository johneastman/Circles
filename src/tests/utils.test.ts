import { Color } from "../game/color";
import { getRandomInteger, getRandomFloat, getRandomColor, sign, colors } from "../game/util";

test("get random integer", () => {
    let min: number = 0;
    let max: number = 10;

    for (let i = 0; i < 100; i++) {    
        let randomNumer: number = getRandomInteger(min, max);
    
        expect(randomNumer).toBeGreaterThanOrEqual(min);
        expect(randomNumer).toBeLessThan(max);

        // Assert that the random number is an integer, not a float
        expect(Number.isInteger(randomNumer)).toBe(true);
    }
});

test("get random float", () => {
    let min: number = 0;
    let max: number = 10;

    for (let i = 0; i < 100; i++) {    
        let randomNumer: number = getRandomFloat(min, max);
    
        expect(randomNumer).toBeGreaterThanOrEqual(min);
        expect(randomNumer).toBeLessThan(max);

        // Assert that the random number is a float, not an integer
        expect(Number.isInteger(randomNumer)).toBe(false);
    }
});

test("get random color", () => {
    for (let i = 0; i < 100; i++) {
        let color: Color = getRandomColor();

        // indexOf returns -1 if the element is not found, so assert the value returned by indexOf is not -1.
        expect(colors.indexOf(color)).toBeGreaterThan(-1);
    }
});

test("test when sign is negative", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.49);

    expect(sign()).toEqual(-1);

    jest.spyOn(Math, 'random').mockRestore();
});

test("test when sign is positive", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.50);

    expect(sign()).toEqual(1);

    jest.spyOn(Math, 'random').mockRestore();
});
