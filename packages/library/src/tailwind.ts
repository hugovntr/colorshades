import { ColorManager } from "./colors";
import { ShadesManager } from "./shades";

export type TailwindShades = {
    [key: number]: string;
};

export function shades(color: string): TailwindShades {
    const result = new ShadesManager(new ColorManager(color));

    return { ...result.toJSON() };
}
