import { BeakerIcon } from "@/components/icons";
import useCombinations from "@/hooks/useCombinations";
import useShades from "@/hooks/useShades";
import App from "@/layouts/app";
import { CombinationType } from "colorshades";
import { FormEvent, useEffect } from "react";

export default function CombinationsPage(): JSX.Element {
    return (
        <App title="Combinations | ColorShades">
            <Title />
            <GetStarted />
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
                    Tired of wasting precious hours trying to figure out the
                    perfect shades for your vibrant brand color?
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 md:mt-16">
                    <a href="#get-started" className="button primary">
                        Get started !
                    </a>
                    <a href="#how-it-works" className="button">
                        Learn more
                    </a>
                </div>
            </div>
        </section>
    );
}

function GetStarted(): JSX.Element {
    const { setColor, color } = useShades();
    const { setType } = useCombinations();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value: string = e.currentTarget["color"].value || "#A5DF36";
        setColor(value);
    };

    return (
        <section
            id="get-started"
            className="relative bg-strong dark:bg-background"
        >
            <div className="flex items-center">
                <div className="container max-w-4xl rounded-3xl py-8 space-y-16">
                    <h2 className="text-center dark">Prepare your mixture</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="">
                                Input your{" "}
                                <span className="text-strong dark">
                                    hexadecimal
                                </span>{" "}
                                color, and let the algorithm mix a unique set of
                                shades for you
                            </p>
                        </div>
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
                        <div className="flex gap-3">
                            {[
                                "opposite",
                                "adjacent",
                                "triadic",
                                "tetradic",
                            ].map((type) => (
                                <button
                                    onClick={() =>
                                        setType(type as CombinationType)
                                    }
                                    key={type}
                                    className="button dark bg-page text-foreground capitalize text-base"
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
