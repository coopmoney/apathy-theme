import * as Types from "../types/index.js";
import ColorLib, { ColorInstance} from "color";


export class Color {
  cv: ColorInstance;
  constructor(
    input: string
  ) {
    this.cv = ColorLib(input);
  }
  lighter(n = 0.2) {
    return this.cv.lighten(n);
  }
  darker(n = 0.2) {
    return this.cv.darken(n);
  }
  transparent(amount = 0.5)  {
    return this.cv.alpha(amount);
  }
}``

export function makeColors<T extends object>(palette: T): { [K in keyof T]: Color } {
  const result: any = {};
  for (const key in palette) {
    result[key] = new Color(palette[key] as unknown as string);
  }
  return result;
}