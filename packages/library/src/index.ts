import { Color, ColorManager } from "./colors";
import { Shades, ShadesManager } from "./shades";

import {
    CombinationManager,
    CombinationOptions,
    CombinationType,
    Combination,
} from "./combinations";

export type { Color, Shades, Combination, CombinationType, CombinationOptions };

export function createColor(input: string, index: number = 0): Color {
    return new ColorManager(input, index);
}

export function createCombination(
    input: string | Color,
    type: CombinationType,
    options?: CombinationOptions
): Combination {
    return new CombinationManager(
        typeof input == "string" ? new ColorManager(input) : input,
        type,
        options
    );
}

export default function createShades(
    input: string | Color,
    count: number = 10
): Shades {
    return new ShadesManager(
        typeof input == "string" ? new ColorManager(input) : input,
        count
    );
}
