import App from "@/layouts/app";
import createShades, {
    createColor,
    createCombination,
    Color,
    Shades,
    Combination,
    CombinationType,
} from "colorshades";
import { FocusEvent, useEffect, useState } from "react";
const defaultColors = require("tailwindcss/colors");

function getDefaultReferences() {
    const references = [];
    for (const key in defaultColors) {
        if (Object.prototype.hasOwnProperty.call(defaultColors, key)) {
            const defaultColor = defaultColors[key];
            if (
                typeof defaultColor == "object" &&
                // !key.toLowerCase().includes("gray") &&
                key !== "lightBlue"
            ) {
                references.push({ name: key, colors: defaultColor });
            }
        }
    }
    return references;
}

const tf = (num: number): number => Math.round(num * 100) / 100;

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

export default function Analysis(): JSX.Element {
    const shadesList = [];
    const shadesListView = [];

    for (const key in defaultColors) {
        if (Object.prototype.hasOwnProperty.call(defaultColors, key)) {
            const defaultColor = defaultColors[key];
            if (typeof defaultColor == "object" && key !== "lightBlue") {
                shadesList.push(defaultColor);
                shadesListView.push(
                    <ShadeAnalysis
                        name={key}
                        references={defaultColor}
                        key={key}
                    />
                );
            }
        }
    }

    return (
        <App>
            <div className="container">
                <h1>Analysis</h1>
            </div>
            <section className="container">
                <ShadeComparaison />
            </section>
            <ColorCombinations />
            <div className="container">
                <h2>Color analysis</h2>
            </div>
            <section className="container space-y-8">{shadesListView}</section>
            {/* <div className="container">
                <h1>Generated boundaries</h1>
            </div>
            <section className="container bg-background p-6">
                <BoundariesCode references={shadesList} />
            </section> */}
        </App>
    );
}

function ShadeAnalysis({
    name,
    references,
    withData = false,
}: {
    name: string;
    references: { [key: number]: string };
    withData?: boolean;
}): JSX.Element {
    const colors = Object.values(references).map((value, i) => {
        return createColor(value, parseInt(Object.keys(references)[i]));
    });

    const averageHue = tf(
        colors.reduce((a, b) => (a += b.hue), 0) / colors.length
    );
    const averageSaturation = tf(
        colors.reduce((a, b) => (a += b.saturation), 0) / colors.length
    );
    const averageLuminance = tf(
        colors.reduce((a, b) => (a += b.luminance), 0) / colors.length
    );

    const boundaries = boundariesForShades(colors);

    return (
        <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col">
                <h4 className="capitalize">{name}</h4>
                <div className="space-y-3 flex flex-col">
                    <div>
                        <p className="text-xs text-gray-400">Average HUE</p>
                        <p className="truncate select-all">{averageHue}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Average SAT</p>
                        <p className="truncate select-all">
                            {averageSaturation}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Average LUM</p>
                        <p className="truncate select-all">
                            {averageLuminance}
                        </p>
                    </div>
                    <pre
                        className={`overflow-y-auto ${
                            withData ? "max-h-[32rem]" : "max-h-40"
                        }`}
                    >
                        <code className="text-xs">
                            {JSON.stringify(boundaries, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6 bg-background rounded-3xl p-6">
                {colors.map((color, i) => {
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
                    return (
                        <div className="text-sm space-y-1" key={color.index}>
                            <figure
                                className={`w-full h-16 rounded-lg transition-colors duration-300 cursor-pointer`}
                                style={{ backgroundColor: color.rgb }}
                            ></figure>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-gray-400">HUE</p>
                                    <p className="truncate">{color.hue}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">SAT</p>
                                    <p className="truncate">
                                        {color.saturation}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">LUM</p>
                                    <p className="truncate">
                                        {color.luminance}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">BR</p>
                                    <p className="font-semibold">
                                        {color.brightness}
                                    </p>
                                </div>
                            </div>
                            {withData && (
                                <div className="grid grid-cols-1 gap-2 border-t border-smooth pt-2">
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            HUE
                                        </p>
                                        <p className="truncate inline-flex justify-between w-full">
                                            <span>{toPrevious.hue}</span>
                                            <span>{toNext.hue}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            SAT
                                        </p>
                                        <p className="truncate inline-flex justify-between w-full">
                                            <span>{toPrevious.saturation}</span>
                                            <span>{toNext.saturation}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            LUM
                                        </p>
                                        <p className="truncate inline-flex justify-between w-full">
                                            <span>{toPrevious.luminance}</span>
                                            <span>{toNext.luminance}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            BRIGHTNESS
                                        </p>
                                        <p className="truncate inline-flex justify-between w-full">
                                            <span>{toPrevious.brightness}</span>
                                            <span>{toNext.brightness}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function BoundariesCode({
    references,
}: {
    references: { [key: number]: string }[];
}): JSX.Element {
    const shades = references.map((reference, i) => {
        const colors = Object.values(reference).map((value, i) => {
            return createColor(value, parseInt(Object.keys(reference)[i]));
        });

        return {
            averageHue: tf(
                colors.reduce((a, b) => (a += b.hue), 0) / colors.length
            ),
            colors,
        };
    });

    const boundaries = shades.map((shade, i) => {
        const next = shades[i + 1] || shade;
        const previous = shades[i - 1] || shade;
        return {
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

    return (
        <pre className="max-h-[32rem] overflow-y-auto">
            <code>{JSON.stringify(boundaries, null, 4)}</code>
        </pre>
    );
}

function ShadeComparaison(): JSX.Element {
    const [selected, select] = useState<{
        name: string;
        colors: { [key: number]: string };
    }>(getDefaultReferences().find((r) => r.name === "rose"));

    const [generated, setGenerated] = useState<Shades>(
        createShades(selected.colors[500])
    );

    useEffect(() => {
        setGenerated(createShades(selected.colors[500]));
    }, [selected]);

    return (
        <div>
            <div className="space-y-8">
                <div>
                    <h2>References</h2>
                    <ShadeAnalysis
                        name={selected.name}
                        references={selected.colors}
                        withData={false}
                    />
                </div>
                <div>
                    <h2>Programmatically generated</h2>
                    <ProgrammaticShadeAnalysis shades={generated} />
                </div>
            </div>
            <div className="space-x-2 flex justify-center mt-8">
                {getDefaultReferences().map(({ name, colors }) => (
                    <figure
                        onClick={() =>
                            select(
                                getDefaultReferences().find(
                                    (r) => r.name === name
                                )
                            )
                        }
                        className="cursor-pointer w-8 h-8 rounded"
                        key={colors[500]}
                        style={{ backgroundColor: colors[500] }}
                    ></figure>
                ))}
            </div>
        </div>
    );
}

function ProgrammaticShadeAnalysis({
    shades,
}: {
    shades: Shades;
}): JSX.Element {
    return (
        <div className="grid grid-cols-4 gap-8">
            <div>
                <h4>Created from</h4>
                <div className="text-sm space-y-1">
                    <figure
                        className={`w-48 h-16 rounded-lg transition-colors duration-300 cursor-pointer`}
                        style={{ backgroundColor: shades.colors[5].rgb }}
                    ></figure>
                    <p className="">{shades.colors[5].hex}</p>
                    <p className="text-strong">{shades.colors[5].index}</p>
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6 bg-background rounded-3xl p-6">
                {shades.colors.map((color) => (
                    <div className="text-sm space-y-1" key={color.hex}>
                        <figure
                            className={`w-full h-16 rounded-lg transition-colors duration-300 cursor-pointer`}
                            style={{ backgroundColor: color.rgb }}
                        ></figure>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-xs text-gray-400">HUE</p>
                                <p className="truncate">{color.hue}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">SAT</p>
                                <p className="truncate">{color.saturation}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">LUM</p>
                                <p className="truncate">{color.luminance}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">BR</p>
                                <p className="font-semibold">
                                    {color.brightness}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ColorCard({
    color,
    withData = false,
}: {
    color: Color;
    withData?: boolean;
}): JSX.Element {
    return (
        <div className="flex-1">
            <figure
                className={`w-full h-16 flex items-end p-3 rounded-lg transition-colors duration-300 select-all`}
                style={{ backgroundColor: color.rgb }}
            >
                <p
                    className={
                        color.isDark
                            ? "text-white"
                            : "text-strong dark:text-page"
                    }
                >
                    {color.hex}
                </p>
            </figure>
            {withData && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <p className="text-xs text-gray-400">HUE</p>
                        <p className="truncate">{color.hue}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">SAT</p>
                        <p className="truncate">{color.saturation}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">LUM</p>
                        <p className="truncate">{color.luminance}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">BR</p>
                        <p className="font-semibold">{color.brightness}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function ColorCombinations(): JSX.Element {
    const [color, setColor] = useState<Color>(createColor("#A5DF36"));
    const [type, setType] = useState<CombinationType>("adjacent");
    const [combination, setCombination] = useState<Combination>(
        createCombination(color, type)
    );

    const changeColor = (e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setColor(() => createColor(value));
    };

    useEffect(() => {
        setCombination(() => createCombination(color, type));
    }, [type, color]);

    return (
        <section className="container">
            <h2>Color Combinations</h2>
            <div className="grid grid-cols-4 gap-8">
                <div className="space-y-6">
                    <input
                        type="text"
                        className="field"
                        defaultValue="#A5DF36"
                        onBlur={changeColor}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {["opposite", "adjacent", "triadic", "tetradic"].map(
                            (t) => (
                                <button
                                    onClick={() =>
                                        setType(t as CombinationType)
                                    }
                                    className="button capitalize"
                                    disabled={type === t}
                                    key={t}
                                >
                                    {t}
                                </button>
                            )
                        )}
                    </div>
                </div>
                <div className="col-span-3 space-y-6">
                    <div className="bg-background p-6 rounded-3xl">
                        <h3>Main colors</h3>
                        <div className="flex  space-x-4">
                            {combination.colors.map((color) => (
                                <ColorCard
                                    color={color}
                                    withData={true}
                                    key={color.hex}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-3xl">
                        <h3>Shades</h3>
                        <div className="space-y-4">
                            {combination.shades.map((shades, i) => (
                                <div key={i} className="grid grid-cols-5 gap-4">
                                    {shades.colors.map((color) => (
                                        <ColorCard
                                            color={color}
                                            key={color.hex}
                                            withData={true}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
