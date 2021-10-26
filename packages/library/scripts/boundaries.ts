import { writeFile } from "fs";
import { join } from "path";
import { createColor } from "../src/index";
import { inspect } from "util";
import defaultColors from "tailwindcss/colors";

function getDefaultReferences() {
    const references = [];
    for (const key in defaultColors) {
        if (Object.prototype.hasOwnProperty.call(defaultColors, key)) {
            const defaultColor = defaultColors[key];
            if (typeof defaultColor == "object" && key !== "lightBlue") {
                references.push({ name: key, colors: defaultColor });
            }
        }
    }
    return references;
}

const tf = (num: number) => Math.round(num * 100) / 100;

function boundariesForShades(colors: Color[]) {
    return colors.map((color, i) => {
        const next = colors[i + 1] || color;
        const previous = colors[i - 1] || color;

        const toNext = {
            hue: tf(next.hue - color.hue),
            saturation: tf(next.saturation - color.saturation),
            luminance: tf(next.luminance - color.luminance),
            brightness: tf(next.brightness - color.brightness),
        };
        const toPrevious = {
            hue: tf(previous.hue - color.hue),
            saturation: tf(previous.saturation - color.saturation),
            luminance: tf(previous.luminance - color.luminance),
            brightness: tf(previous.brightness - color.brightness),
        };
        return {
            index: color.index,
            hue: { prev: toPrevious.hue, next: toNext.hue },
            saturation: {
                prev: toPrevious.saturation,
                next: toNext.saturation,
            },
            luminance: { prev: toPrevious.luminance, next: toNext.luminance },
            brightness: {
                max:
                    (color.brightness + previous.brightness) / 2 !==
                    color.brightness
                        ? (color.brightness + previous.brightness) / 2
                        : 255,
                min:
                    (color.brightness + next.brightness) / 2 !==
                    color.brightness
                        ? (color.brightness + next.brightness) / 2
                        : 0,
            },
        };
    });
}

const shades = getDefaultReferences().map(
    (reference: { name: string; colors: any }, i) => {
        const colors = Object.values(reference.colors).map(
            (value: string, i) => {
                return createColor(
                    value,
                    parseInt(Object.keys(reference.colors)[i])
                );
            }
        );

        const averageSat = tf(
            colors.reduce((a, b) => (a += b.saturation), 0) / colors.length
        );

        return {
            name: reference.name,
            averageHue: tf(
                colors.reduce((a, b) => (a += b.hue), 0) / colors.length
            ),
            isGray: averageSat <= 0.4,
            colors,
        };
    }
);

function generateBoundaries(shades) {
    return shades.map((shade, i) => {
        const next = shades[i + 1] || shade;
        const previous = shades[i - 1] || shade;
        return {
            name: shade.name,
            isGray: shade.isGray,
            max:
                (shade.averageHue + previous.averageHue) / 2 !==
                shade.averageHue
                    ? tf((shade.averageHue + previous.averageHue) / 2)
                    : 360,
            min:
                (shade.averageHue + next.averageHue) / 2 !== shade.averageHue
                    ? tf((shade.averageHue + next.averageHue) / 2)
                    : 0,
            boundaries: boundariesForShades(shade.colors),
        };
    });
}

const data = inspect(
    [
        ...generateBoundaries(shades.filter(({ isGray }) => !isGray)),
        ...generateBoundaries(
            shades
                .filter(({ isGray }) => isGray)
                .sort((a, b) => (a.averageHue < b.averageHue ? 1 : -1))
        ),
    ],
    false,
    4,
    false
);

writeFile(
    join(process.cwd(), "src", "data", "boundaries.js"),
    `module.export = ${data}`,
    (err) => {
        if (err) throw err;
        console.log("✅ Done");
    }
);
