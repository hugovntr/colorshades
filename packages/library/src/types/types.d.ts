type Color = {
    red: number;
    green: number;
    blue: number;

    hue: number;
    saturation: number;
    luminance: number;

    hex: string;
    rgb: string;
    hsl: string;

    index: number;
    brightness: number;
    isDark: boolean;
    isGray: boolean;

    toString: () => string;
    toJSON: () => { [key: number]: string };
};

type Shades = {
    colors: Color[];
    name: string;
};

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
