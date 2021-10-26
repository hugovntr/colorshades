import hueBoundaries from "./data/boundaries";

const indexes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export { hueBoundaries, indexes };

export type HueBoundary = {
    name: string;
    isGray: boolean;
    max: number;
    min: number;
    boundaries: ColorBoundary[];
};

export type ColorBoundary = {
    index: number;
    hue: { prev: number; next: number };
    saturation: { prev: number; next: number };
    luminance: { prev: number; next: number };
    brightness: { max: number; min: number };
};

function getGrayBoundaries(): HueBoundary[] {
    return hueBoundaries.filter(({ isGray }) => isGray);
}

function getColorBoundaries(): HueBoundary[] {
    return hueBoundaries.filter(({ isGray }) => !isGray);
}

export function getBoundaries(
    hue: number,
    isGray: boolean = false
): HueBoundary {
    const boundaries = isGray ? getGrayBoundaries() : getColorBoundaries();
    if (hue === 0) return boundaries[boundaries.length - 1];
    return boundaries.find(({ min, max }) => hue > min && hue <= max);
}
