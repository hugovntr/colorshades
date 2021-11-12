import { ShadesManager } from "./shades";
import { ColorManager } from "./colors";
import { decrementHue, hslToRgb, incrementHue, rgbToHex } from "./utils";

import type { Shades } from "./shades";
import type { Color } from "./colors";

export type CombinationType = "opposite" | "triadic" | "tetradic" | "adjacent";

export type Combination = {
    baseColor: Color;
    type: CombinationType;
    shades: Shades[];
    colors: Color[];
};

export type CombinationOptions = {
    /**
     * ## Distance
     * Hue distance between two combinations
     *
     * ---
     * **The color wheel goes from 0 to 360 degrees.**
     * Keep that in mind when messing with the
     * distance
     * @type number
     */
    distance: number;
};

export class CombinationManager implements Combination {
    private result: CombinationAbstract;

    constructor(
        public readonly baseColor: Color,
        public readonly type: CombinationType,
        public readonly options?: CombinationOptions
    ) {
        switch (type) {
            case "opposite":
                this.result = new OppositeCombination(baseColor, options);
                break;
            case "triadic":
                this.result = new TriadicCombination(baseColor, {
                    ...{ distance: 30 },
                    ...options,
                });
                break;
            case "tetradic":
                this.result = new TetradicCombination(baseColor, {
                    ...{ distance: 30 },
                    ...options,
                });
                break;
            case "adjacent":
                this.result = new AdjacentCombination(baseColor, {
                    ...{ distance: 30 },
                    ...options,
                });
                break;

            default:
                throw new Error(
                    `Combination with type ${type} not implemented`
                );
                break;
        }
    }

    get shades() {
        return [new ShadesManager(this.baseColor), ...this.result.shades];
    }

    get colors() {
        return [
            this.baseColor,
            ...this.result.shades.map((s) =>
                s.colors.find(({ index }) => index === this.baseColor.index)
            ),
        ];
    }
}

type CombinationOperation = {
    source: Color;
    increment: boolean;
    distance?: number;
};

class CombinationAbstract {
    public shades: Shades[] = [];

    constructor(
        protected readonly baseColor: Color,
        public readonly options: CombinationOptions
    ) {
        this.handle();
    }
    handle() {
        throw new Error("Combination not implemented");
    }

    protected findOpposite(): Color {
        return new ColorManager(
            rgbToHex(
                hslToRgb({
                    h: incrementHue(this.baseColor.hue, 180),
                    s: this.baseColor.saturation,
                    l: this.baseColor.luminance,
                })
            )
        );
    }

    protected executeOperations(operations: CombinationOperation[]) {
        operations.map((op) => {
            const color: Color = new ColorManager(
                rgbToHex(
                    hslToRgb({
                        h: op.increment
                            ? incrementHue(
                                  op.source.hue,
                                  op?.distance ?? this.options.distance
                              )
                            : decrementHue(
                                  op.source.hue,
                                  op?.distance ?? this.options.distance
                              ),
                        s: op.source.saturation,
                        l: op.source.luminance,
                    })
                )
            );

            this.shades.push(new ShadesManager(color));
        });
    }
}

class OppositeCombination extends CombinationAbstract {
    handle() {
        this.shades.push(new ShadesManager(super.findOpposite()));
    }
}

class TriadicCombination extends CombinationAbstract {
    handle() {
        const opposite = this.findOpposite();
        const operations: CombinationOperation[] = [
            { source: opposite, increment: true },
            { source: opposite, increment: false },
        ];

        super.executeOperations(operations);
    }
}

class TetradicCombination extends CombinationAbstract {
    handle() {
        const opposite = this.findOpposite();
        const operations = [
            { source: this.baseColor, increment: true },
            { source: opposite, increment: true, distance: 0 },
            { source: opposite, increment: true },
        ];

        super.executeOperations(operations);
    }
}
class AdjacentCombination extends CombinationAbstract {
    handle() {
        const operations = [
            { source: this.baseColor, increment: true },
            { source: this.baseColor, increment: false },
        ];

        super.executeOperations(operations);
    }
}
