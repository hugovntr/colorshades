import createShades from "./index";

export type TailwindShades = {
    [key: string]: {
        [key: number]: string;
    };
};

export default function shades(name: string, color: string): TailwindShades {
    const shades = createShades(color);

    return {
        [name]: {
            ...shades.toJSON(),
        },
    };
}
