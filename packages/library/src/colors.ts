import { getBoundaries } from "./schema";
import { getBrightness, hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "./utils";

import type { Rgb, Hsl } from "./utils";

export type ColorInput = string | Hsl | Rgb;

export type Color = {
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

export class ColorManager implements Color {
    red: number;
    green: number;
    blue: number;
    hue: number;
    saturation: number;
    luminance: number;
    hex: string;
    rgb: string;
    hsl: string;
    brightness: number;
    isDark: boolean;
    isGray: boolean;

    constructor(input: ColorInput, public index: number = 0) {
        const rgb = inputToRgb(input);

        this.hex = `#${rgbToHex(rgb)}`;
        this.setRgb(rgb);
        this.setHsl(rgb);

        this.brightness = getBrightness(rgb);
        this.isDark = this.brightness < 180;
        this.isGray = this.saturation <= 0.5;

        if (this.index === 0) {
            this.setIndex();
        }
    }

    private setRgb(rgb: Rgb) {
        const { r, g, b } = rgb;
        this.red = r;
        this.green = g;
        this.blue = b;

        this.rgb = `rgb(${r}, ${g}, ${b})`;
    }

    private setHsl(rgb: Rgb) {
        const { h, s, l } = rgbToHsl(rgb);
        this.hue = h;
        this.saturation = s;
        this.luminance = l;

        this.hsl = `hsl(${h}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(
            0
        )}%)`;
    }

    private setIndex() {
        const { boundaries } = getBoundaries(this.hue, this.isGray);
        const { index } = boundaries.find(({ brightness }) => {
            return (
                (this.brightness > brightness.min &&
                    this.brightness <= brightness.max) ||
                (this.brightness === 0 && brightness.min === 0)
            );
        });
        this.index = index;
    }

    toString(): string {
        return this.hex;
    }

    toJSON(): { [key: number]: string } {
        return { [this.index]: this.hex };
    }
}

function inputToRgb(input: ColorInput): Rgb {
    if (typeof input == "string") {
        return hexToRgb(input);
    }

    if (isHsl(input)) {
        console.log(hslToRgb(input));

        return hslToRgb(input);
    } else {
        return input;
    }
}

function isHsl(input: any): input is Hsl {
    return input.h !== undefined;
}
