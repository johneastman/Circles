class Color {
  r: number
  g: number
  b: number

  constructor(r: number, g: number, b: number) {
      this.r = r
      this.g = g
      this.b = b
  }

  rgbString(offset: number = 0): string {
    /*
    Return an RGB string for the color. This method also includes an offset to slightly modify the color.
    */
    return `rgb(${this.r + offset}, ${this.g + offset}, ${this.b + offset})`;
  }
}
