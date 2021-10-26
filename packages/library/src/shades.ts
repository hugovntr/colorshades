import { ColorManager } from "./colors";
import { getBoundaries } from "./schema";
import { getBrightness, hslToRgb, rgbToHex } from "./utils";

import type { Color } from "./colors";
import type { HueBoundary, ColorBoundary } from "./schema";

export type Shades = {
    colors: Color[];
    name: string;

    toJSON: () => { [key: number]: string };
};

export class ShadesManager implements Shades {
    colors: Color[];
    readonly name: string;
    private _boundaries: HueBoundary;

    constructor(baseColor: Color, private count: number = 10) {
        this.colors = [baseColor];
        this._boundaries = getBoundaries(baseColor.hue, baseColor.isGray);
        this.name = this._boundaries.name;

        this._generate();
    }

    private _boundariesForIndex(index: number): ColorBoundary {
        return this._boundaries.boundaries.find((b) => b.index === index);
    }

    private _inBoundaries(
        brightness: number,
        boundaries: ColorBoundary
    ): boolean {
        const { brightness: bb } = boundaries;
        return brightness > bb.min && brightness <= bb.max;
    }

    toJSON() {
        let obj = {};
        this.colors.map((c) => Object.assign(obj, c.toJSON()));
        return obj;
    }

    /**
     * Generate the shades
     * ---
     * Take the base color, find its index and then loop over each
     * missing indexes to find their color using the `_findColor`
     * method.
     *
     * If the color can not be found, an error is sent to the console
     */
    private _generate() {
        const baseIndex = this.colors[0].index;
        const afterIndexes = this._boundaries.boundaries.map(
            ({ index }) => index
        );
        const beforeIndexes = afterIndexes.splice(
            afterIndexes.indexOf(baseIndex)
        );
        const indexes = [
            ...beforeIndexes,
            ...[...afterIndexes, baseIndex].reverse(),
        ];

        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] === baseIndex) continue;

            try {
                const previousColor: Color = this.colors.find(
                    (c) => c.index === indexes[i - 1]
                );
                this.colors.push(this._findColor(previousColor, indexes[i]));
            } catch {
                console.error(`Could not define color at index ${indexes[i]}`);
            }
        }

        this.colors.sort((a, b) => (a.index > b.index ? 1 : -1));
    }

    /**
     * Find color
     * ---
     * Loop over the pre-defined boundaries to find the next, or previous
     * color in the shades
     *
     * @param previousColor - Previous color in the shades
     * @param index - Index of the future color
     * @returns Color
     */
    private _findColor(previousColor: Color, index: number): Color {
        const isAfter = index > previousColor.index;
        const guide = this._boundariesForIndex(previousColor.index);
        const boundaries = this._boundariesForIndex(index);
        let brightness = 0;

        // Looping while brightness is not between desired boundaries
        let i = 0;
        while (!this._inBoundaries(brightness, boundaries)) {
            const variator =
                i === 0
                    ? 1
                    : brightness <= boundaries.brightness.min
                    ? 1.01 + 0.005 * i
                    : brightness > boundaries.brightness.max
                    ? 0.99 - 0.005 * i
                    : 1;

            var rgb = hslToRgb({
                h:
                    previousColor.hue +
                    (isAfter ? guide.hue.next : guide.hue.prev),
                s:
                    previousColor.saturation +
                    (isAfter ? guide.saturation.next : guide.saturation.prev),
                l:
                    (previousColor.luminance +
                        (isAfter
                            ? guide.luminance.next
                            : guide.luminance.prev)) *
                    variator,
            });
            brightness = getBrightness(rgb);

            /**
             * Prevent unexpected behavior to crash everything
             * ---
             * Until I can find a better solution to tackle UBs
             */
            if (i >= 100) {
                console.error(`Too many loops over color at index ${index}`);
                console.log(brightness, boundaries.brightness);
                break;
            }
            i++;
        }
        return new ColorManager(rgbToHex(rgb), index);
    }
}
