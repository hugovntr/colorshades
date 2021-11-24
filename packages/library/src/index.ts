import { Color, ColorInput, ColorManager } from "./colors";
import { Shades, ShadesManager } from "./shades";

import {
    CombinationManager,
    CombinationOptions,
    CombinationType,
    Combination,
} from "./combinations";

export type {
    Color,
    ColorInput,
    Shades,
    Combination,
    CombinationType,
    CombinationOptions,
};

export function createColor(input: ColorInput, index: number = 0): Color {
    return new ColorManager(input, index);
}

export function createCombination(
    input: ColorInput | Color,
    type: CombinationType,
    options?: CombinationOptions
): Combination {
    return new CombinationManager(
        input instanceof ColorManager
            ? input
            : new ColorManager(input as ColorInput),
        type,
        options
    );
}

export default function createShades(
    input: ColorInput | Color,
    count: number = 10
): Shades {
    return new ShadesManager(
        input instanceof ColorManager
            ? input
            : new ColorManager(input as ColorInput),
        count
    );
}
