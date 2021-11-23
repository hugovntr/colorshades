export type Rgb = {
    r: number;
    g: number;
    b: number;
};

export type Hsl = {
    h: number;
    s: number;
    l: number;
};

export type Hsp = {
    h: number;
    s: number;
    p: number;
};

export function tf(num: number) {
    return Math.round(num * 100) / 100;
}

export function incrementHue(from: number, by: number): number {
    return from + by > 360 ? from + by - 360 : from + by;
}

export function decrementHue(from: number, by: number): number {
    return from - by < 0 ? 360 + (from - by) : from - by;
}

export function hexToRgb(hex: string): Rgb {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map(function (hex) {
                return hex + hex;
            })
            .join("");
    }
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return rgb
        ? {
              r: parseInt(rgb[1], 16),
              g: parseInt(rgb[2], 16),
              b: parseInt(rgb[3], 16),
          }
        : null;
}

/**
 * Convert RGB to HSL
 *
 * @author w3schools
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 */
export function rgbToHsl(rgb: Rgb): Hsl {
    const { r, g, b } = rgb;
    const rgbArray: number[] = [r / 255, g / 255, b / 255];
    let min: number,
        max: number,
        i: number,
        h: number,
        s: number,
        l: number,
        maxcolor: number;

    min = rgbArray[0];
    max = rgbArray[0];
    maxcolor = 0;
    for (i = 0; i < rgbArray.length - 1; i++) {
        if (rgbArray[i + 1] <= min) {
            min = rgbArray[i + 1];
        }
        if (rgbArray[i + 1] >= max) {
            max = rgbArray[i + 1];
            maxcolor = i + 1;
        }
    }
    if (maxcolor == 0) {
        h = (rgbArray[1] - rgbArray[2]) / (max - min);
    }
    if (maxcolor == 1) {
        h = 2 + (rgbArray[2] - rgbArray[0]) / (max - min);
    }
    if (maxcolor == 2) {
        h = 4 + (rgbArray[0] - rgbArray[1]) / (max - min);
    }
    if (isNaN(h)) {
        h = 0;
    }
    h = h * 60;
    if (h < 0) {
        h = h + 360;
    }
    l = (min + max) / 2;
    if (min == max) {
        s = 0;
    } else {
        if (l < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
    }
    s = s;
    return {
        h: parseInt(h.toFixed(2)),
        s: tf(s),
        l: tf(l),
    };
}

export function hexToHsl(hex: string): Hsl | null {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHsl(rgb) : null;
}

/**
 * Convert HSL to RGB
 *
 * @author w3schools
 *
 * @param {number} hue Hue
 * @param {number} sat Saturation
 * @param {number} light Lightness
 */
export function hslToRgb(hsl: Hsl): Rgb {
    let { h: hue, s: sat, l: lum } = hsl;
    if (hue > 360) hue = 360 - hue;
    if (hue < 0) hue = 360 + hue;
    if (sat > 1) sat = 1;
    if (sat < 0) sat = 0;
    if (lum > 1) lum = 1;
    if (lum < 0) lum = 0;

    let t1: number, t2: number, r: number, g: number, b: number;
    hue = hue / 60;
    if (lum <= 0.5) {
        t2 = lum * (sat + 1);
    } else {
        t2 = lum + sat - lum * sat;
    }
    t1 = lum * 2 - t2;
    r = hueToRgb(t1, t2, hue + 2) * 255;
    g = hueToRgb(t1, t2, hue) * 255;
    b = hueToRgb(t1, t2, hue - 2) * 255;
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
    };
}
function hueToRgb(t1: number, t2: number, hue: number): number {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if (hue < 3) return t2;
    else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
}

export function rgbToHex(rgb: Rgb): string {
    return (
        (1 << 24) +
        (Math.abs(rgb.r) << 16) +
        (Math.abs(rgb.g) << 8) +
        Math.abs(rgb.b)
    )
        .toString(16)
        .slice(1);
}

export function getBrightness(color: string | Rgb) {
    if (typeof color == "string") {
        color = hexToRgb(color);
    }

    return parseInt(
        Math.sqrt(
            color.r * color.r * 0.299 +
                color.g * color.g * 0.587 +
                color.b * color.b * 0.114
        ).toFixed(0)
    );
}

export function rgbToHsp(rgb: Rgb): Hsp {
    let h: number,
        s: number,
        p: number,
        min: number,
        max: number,
        maxcolor = 0;
    const { r, g, b } = rgb;
    const rgbArray: number[] = [r / 255, g / 255, b / 255];

    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    p = getBrightness(rgb);

    for (var i = 0; i < rgbArray.length - 1; i++) {
        if (rgb[i + 1] <= min) {
            min = rgb[i + 1];
        }
        if (rgb[i + 1] >= max) {
            max = rgb[i + 1];
            maxcolor = i + 1;
        }
    }
    if (maxcolor == 0) {
        h = (rgb[1] - rgb[2]) / (max - min);
    }
    if (maxcolor == 1) {
        h = 2 + (rgb[2] - rgb[0]) / (max - min);
    }
    if (maxcolor == 2) {
        h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }
    if (isNaN(h)) {
        h = 0;
    }
    h = h * 60;
    if (h < 0) {
        h = h + 360;
    }
    if (min == max) {
        s = 0;
    } else {
        if ((min + max) / 2 < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2 - max - min);
        }
    }

    return {
        h: parseFloat(h.toFixed(4)),
        s: parseFloat(s.toFixed(4)),
        p: parseFloat(p.toFixed(4)),
    };
}
