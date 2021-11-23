import {
    AdjacentColorsIcon,
    BeakerIcon,
    DuplicateIcon,
    OppositeColorsIcon,
    TetradicColorsIcon,
    TriadicColorsIcon,
} from "@/components/icons";
import { ColorToast } from "@/components/toasts";
import useCombinations from "@/hooks/useCombinations";
import useShades from "@/hooks/useShades";
import App from "@/layouts/app";
import { Color, CombinationType, Shades } from "colorshades";
import React, { FormEvent, MouseEvent, useRef, useState } from "react";

const availableCombinations = [
    {
        type: "opposite",
        description:
            "The opposite combination adds 180° of rotation to the input hue",
        Icon: (props: any) => <OppositeColorsIcon {...props} />,
    },
    {
        type: "adjacent",
        description:
            "The adjacent combinations takes 2 colors from the input color, a warmer and a colder. Both of these colors have the same hue distance from the input color's hue",
        Icon: (props: any) => <AdjacentColorsIcon {...props} />,
    },
    {
        type: "triadic",
        description:
            "The triadic combinations, similar to the adjacent, takes 2 colors from the input. The only difference is that all colors have the exact same hue distance between them.",
        Icon: (props: any) => <TriadicColorsIcon {...props} />,
    },
    {
        type: "tetradic",
        description: "The tetradic combinations form a rectangle of colors.",
        Icon: (props: any) => <TetradicColorsIcon {...props} />,
    },
];

export default function CombinationsPage(): JSX.Element {
    return (
        <App title="Combinations | ColorShades">
            <Title />
            <div className="bg-page">
                <GetStarted />
                <Showcase />
            </div>
        </App>
    );
}

function Title(): JSX.Element {
    return (
        <section id="header" className="pt-0 container">
            <div className="bg-background rounded-3xl py-12 lg:py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1>
                        Brew stunning <br className="hidden sm:block" />
                        <span className="text-combinations">
                            color combinations
                        </span>
                    </h1>
                </div>
                <p className="text-lg max-w-4xl mx-auto">
                    Find the perfect matching shades for your primary shades
                    with the combinations algorithm
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 md:mt-16">
                    <a href="#get-started" className="button primary">
                        Create !
                    </a>
                </div>
            </div>
        </section>
    );
}

function GetStarted(): JSX.Element {
    const { setColor, color } = useShades();
    const { setType, type: combinationsType } = useCombinations();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value: string = e.currentTarget["color"].value || "#A5DF36";
        setColor(value);
    };

    return (
        <section
            id="get-started"
            className="relative bg-strong dark:bg-background pb-8"
        >
            <div className="flex items-center">
                <div className="container max-w-4xl rounded-3xl py-8 space-y-16">
                    <h2 className="text-center dark">Prepare your mixture</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                        <p>
                            Input your{" "}
                            <span className="text-strong dark">
                                hexadecimal
                            </span>{" "}
                            color...
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-end space-y-6 dark"
                        >
                            <div className="field w-full p-0 focus-within:ring-4 focus-within:ring-primary-500 flex items-center pr-2">
                                <input
                                    type="text"
                                    name="color"
                                    autoComplete="off"
                                    placeholder={color.hex}
                                    pattern="^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$"
                                    title="Use 3 letters hex format (#F00) or 6 letters (#FF0000), # is optionnal"
                                    className="dark field min-w-0 !ring-0 flex-1"
                                />
                                <button
                                    type="submit"
                                    className="button primary p-2 transition hover:rotate-12"
                                >
                                    <BeakerIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-6 flex flex-col items-center">
                        <p>
                            Select the{" "}
                            <span className="text-strong dark">type</span> of
                            combinations that you want...
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {availableCombinations.map(({ type, Icon }) => (
                                <button
                                    onClick={() =>
                                        setType(type as CombinationType)
                                    }
                                    key={type}
                                    className="button dark bg-page text-foreground capitalize"
                                    disabled={type === combinationsType}
                                >
                                    <Icon className="w-6 h-6" />
                                    <span>{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-8 space-y-2">
                        <p>And take a look at your final mix</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-8 h-8 animate-bounce text-primary-500"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 10L12.7071 13.2929C12.3166 13.6834 11.6834 13.6834 11.2929 13.2929L8 10"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Showcase(): JSX.Element {
    const { combinations, type } = useCombinations();
    const [inspected, inspect] = useState<Color>(null);
    const copyToClipboardRef = useRef<HTMLButtonElement>(null);
    const currentComb = availableCombinations.find(
        (item) => item.type === type
    );

    /**
     * A very ugly way to copy and alert the user
     *
     * @param e - Click event
     */
    const copyToClipboard = (
        e: MouseEvent<HTMLButtonElement>,
        shades: Shades
    ) => {
        e.preventDefault();
        const target = e.currentTarget;
        navigator.clipboard
            .writeText(JSON.stringify(shades))
            .then(() => {
                const html = copyToClipboardRef.current.innerHTML;
                target.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-green-500">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12l5 4 7-8" />
                    </svg>
                `;
                setTimeout(() => {
                    target.innerHTML = html;
                }, 1000);
            })
            .catch(console.error);
    };

    return (
        <section id="showcase" className="container">
            <div className="mb-24 flex flex-col items-center space-y-6 max-w-md mx-auto">
                <currentComb.Icon className="w-16 h-16" />
                <div>
                    <h2 className="capitalize my-0 float-left inline-block mr-4">
                        {type}
                    </h2>
                    <p className="float-none">{currentComb.description}</p>
                </div>
            </div>
            <div className="space-y-24">
                {combinations.shades.map((shades, index) => {
                    const mainColor: Color = combinations.colors[index];
                    return (
                        <div
                            className="grid grid-cols-1 lg:grid-cols-3 items-start gap-3 lg:gap-16"
                            key={index}
                        >
                            <div className="max-w-xl flex flex-col items-center lg:items-start">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="capitalize mb-0 flex-1">
                                        {shades.name}
                                    </h3>

                                    <button
                                        ref={copyToClipboardRef}
                                        onClick={(e) =>
                                            copyToClipboard(e, shades)
                                        }
                                        className="button bg-accents hover:bg-smooth text-foreground p-3"
                                    >
                                        <DuplicateIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="w-full">
                                    <figure
                                        className="w-2/3 h-4 rounded transition-colors duration-300"
                                        style={{
                                            backgroundColor: mainColor.rgb,
                                        }}
                                    ></figure>
                                    <p className="text-strong text-lg uppercase mb-4 mt-2 select-all">
                                        {mainColor.hex}
                                    </p>
                                    <div className="hidden lg:grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-smooth text-sm">
                                                HUE
                                            </p>
                                            <p>{mainColor.hue}</p>
                                        </div>
                                        <div>
                                            <p className="text-smooth text-sm">
                                                SATURATION
                                            </p>
                                            <p>{mainColor.saturation * 100}%</p>
                                        </div>
                                        <div>
                                            <p className="text-smooth text-sm">
                                                LUMINANCE
                                            </p>
                                            <p>{mainColor.luminance * 100}%</p>
                                        </div>
                                        <div>
                                            <p className="text-smooth text-sm">
                                                BRIGHTNESS
                                            </p>
                                            <p>{mainColor.brightness}</p>
                                        </div>
                                        <div>
                                            <p className="text-smooth text-sm">
                                                RGB
                                            </p>
                                            <p className="truncate select-all">
                                                {mainColor.rgb}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-smooth text-sm">
                                                HSL
                                            </p>
                                            <p className="truncate select-all">
                                                {mainColor.hsl}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6 lg:col-span-2 bg-background rounded-3xl p-6">
                                {shades.colors.map((color) => (
                                    <div
                                        className="text-sm space-y-1"
                                        key={color.hex}
                                    >
                                        <figure
                                            onClick={() => inspect(color)}
                                            className={`w-full h-16 rounded-lg transition-colors duration-300 cursor-pointer`}
                                            style={{
                                                backgroundColor: color.rgb,
                                            }}
                                        ></figure>
                                        <p className="uppercase">{color.hex}</p>
                                        <p className="text-strong">
                                            {color.index}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ColorToast color={inspected} />
        </section>
    );
}
