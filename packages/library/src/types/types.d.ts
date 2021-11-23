import type { Combination } from "../combinations";
import type { Color } from "../colors";
import type { Shades } from "../shades";

type HueBoundary = {
    name: string;
    isGray: boolean;
    max: number;
    min: number;
    boundaries: ColorBoundary[];
};

type ColorBoundary = {
    index: number;
    hue: { prev: number; next: number };
    saturation: { prev: number; next: number };
    luminance: { prev: number; next: number };
    brightness: { max: number; min: number };
};

type Rgb = {
    r: number;
    g: number;
    b: number;
};

type Hsl = {
    h: number;
    s: number;
    l: number;
};

type Hsp = {
    h: number;
    s: number;
    p: number;
};
