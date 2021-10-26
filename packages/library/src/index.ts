import { Color, ColorManager } from "./colors";
import { Shades, ShadesManager } from "./shades";

export { Color, Shades };

export function createColor(input: string, index: number = 0): Color {
    return new ColorManager(input, index);
}

export default function createShades(
    input: string,
    count: number = 10
): Shades {
    return new ShadesManager(new ColorManager(input), count);
}
