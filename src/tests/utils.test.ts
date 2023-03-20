import { Color } from "../game/color";
import { getRandomInteger, getRandomFloat, getRandomColor, sign, colors, ordinal } from "../game/util";

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

test("ordinal number", () => {
    expect(ordinal(0)).toEqual("0th");
    expect(ordinal(1)).toEqual("1st");
    expect(ordinal(2)).toEqual("2nd");
    expect(ordinal(3)).toEqual("3rd");
    expect(ordinal(4)).toEqual("4th");
    expect(ordinal(5)).toEqual("5th");
    expect(ordinal(6)).toEqual("6th");
    expect(ordinal(7)).toEqual("7th");
    expect(ordinal(8)).toEqual("8th");
    expect(ordinal(9)).toEqual("9th");
    expect(ordinal(10)).toEqual("10th");
    expect(ordinal(11)).toEqual("11th");
    expect(ordinal(12)).toEqual("12th");
    expect(ordinal(13)).toEqual("13th");

    expect(ordinal(1013)).toEqual("1013th");
});
