import { ColorBadge } from "@/components/badges";
import {
    BeakerIcon,
    DuplicateIcon,
    GithubIcon,
    TwitterIcon,
} from "@/components/icons";
import { ColorToast } from "@/components/toasts";
import useShades from "@/hooks/useShades";
import App from "@/layouts/app";
import { Color } from "colorshades";
import Link from "next/link";
import { FormEvent, MouseEvent, useRef, useState } from "react";

export default function Index(): JSX.Element {
    return (
        <App>
            <Title />
            <GetStarted />
            <ShadesShowcase />
            <HowItWorks />
            <Share />
        </App>
    );
}

function Title(): JSX.Element {
    return (
        <section id="header" className="pt-0 container">
            <div className="bg-background rounded-3xl py-12 lg:py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1>
                        Create unique color <br className="hidden sm:block" />
                        shades{" "}
                        <span className="text-primary-500">in seconds</span>
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
                    <h2 className="text-center dark">Let the magic happen</h2>
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
                    </div>
                </div>
            </div>
        </section>
    );
}

function ShadesShowcase(): JSX.Element {
    const { shades, color } = useShades();
    const [inspected, inspect] = useState<Color>(null);
    const copyToClipboardRef = useRef<HTMLButtonElement>(null);

    /**
     * A very ugly way to copy and alert the user
     *
     * @param e - Click event
     */
    const copyToClipboard = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.clipboard
            .writeText(JSON.stringify(shades))
            .then(() => {
                const html = copyToClipboardRef.current.innerHTML;
                copyToClipboardRef.current.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-green-500">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12l5 4 7-8" />
                    </svg>
                    <span>Copied</span>
                `;
                setTimeout(() => {
                    copyToClipboardRef.current.innerHTML = html;
                }, 1000);
            })
            .catch(console.error);
    };

    return (
        <section
            id="showcase"
            className="container grid grid-cols-1 lg:grid-cols-3 items-center gap-16 pb-0"
        >
            <div className="max-w-xl mx-auto flex flex-col items-center lg:items-start">
                <h2 className="text-center lg:text-left">
                    Say hello to your <br className="hidden xl:block" />
                    <span className="text-primary-500">color shades</span>
                </h2>
                <div className="space-y-4">
                    <p>
                        Throught the power of computing{" "}
                        <span className="text-smooth">
                            (and a lot of if, else and loops)
                        </span>{" "}
                        the algorithm was able to convert{" "}
                        <ColorBadge color={color} /> to a complete list of 10
                        shades starting from{" "}
                        <ColorBadge color={shades.colors[0]} /> all the way to{" "}
                        <ColorBadge
                            color={shades.colors[shades.colors.length - 1]}
                        />
                    </p>
                    <p>
                        It even knows that these are shades of{" "}
                        <span className="text-primary-500 capitalize">
                            {shades.name.toLowerCase().includes("gray")
                                ? "Gray"
                                : shades.name}
                        </span>
                    </p>
                </div>
                <button
                    ref={copyToClipboardRef}
                    onClick={copyToClipboard}
                    className="button mt-12"
                >
                    <DuplicateIcon className="w-6 h-6" />
                    <span>Copy to clipboard</span>
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6 lg:col-span-2 bg-background rounded-3xl p-6">
                {shades.colors.map((color) => (
                    <div className="text-sm space-y-1" key={color.index}>
                        <figure
                            onClick={() => inspect(color)}
                            className={`w-full h-16 rounded-lg transition-colors duration-300 cursor-pointer`}
                            style={{ backgroundColor: color.rgb }}
                        ></figure>
                        <p className="uppercase">{color.hex}</p>
                        <p className="text-strong">{color.index}</p>
                    </div>
                ))}
            </div>
            <ColorToast color={inspected} />
        </section>
    );
}

function HowItWorks(): JSX.Element {
    return (
        <section
            id="how-it-works"
            className="container space-y-16 max-w-5xl text-center"
        >
            <h2>But how does it works...</h2>

            <div className="withCounter space-y-16">
                <article className="bg-background py-16 rounded-3xl px-8">
                    <h3 className="counterIncrement">Color analysis</h3>
                    <p>
                        First, the algorithm analyse the color that you fed it
                        and extract hunderds of data points out of it. Things
                        like hue, saturation or luminance are very useful for
                        the next steps. This color will serve as a base for to
                        create the shades
                    </p>
                </article>
                <article className="bg-background py-16 rounded-3xl px-8">
                    <h3 className="counterIncrement">Calculations</h3>
                    <div className="space-y-4">
                        <p>
                            We all know by now that all colors are not perceived
                            as equal, unfortunatelly. Yellow tends to appear
                            light than green for example, or blue which is much
                            darker than red.
                        </p>
                        <p>
                            With this in mind, as our goal is to create shades
                            from a single color, we must calculate the{" "}
                            <span className="text-strong">
                                perceived brightness
                            </span>
                            .
                        </p>
                        <p>
                            This indicator will allow us to determine the
                            location of the base color in the future shades
                        </p>
                    </div>
                </article>
                <article className="bg-background py-16 rounded-3xl px-8">
                    <h3 className="counterIncrement">Data matching</h3>
                    <div className="space-y-4">
                        <p>
                            The data has been extracted, the{" "}
                            <span className="text-strong">
                                perceived brightness
                            </span>{" "}
                            has been calculated, now we need to compare all the
                            data we have collected with a reference database.
                        </p>
                        <p>
                            As a professional, I have stored this database in a
                            safe and undisclosed location... **hmm hmm** GitHub.
                        </p>
                        <p>
                            These references will allow us to define what color
                            is the base color and how it will be processed
                            afterwards.
                        </p>
                    </div>
                </article>
                <article className="bg-background py-16 rounded-3xl px-8">
                    <h3 className="counterIncrement">Spinning the wheel</h3>
                    <div className="space-y-4">
                        <p>
                            Now that we know the properties of the shades of our
                            base color, we can apply our algorithm to create
                            said shades piece by piece.
                        </p>
                        <p>
                            All this, and this is the best part, in few
                            milliseconds without having to worry or do anything!
                        </p>
                    </div>
                </article>
            </div>

            <div className="space-y-4 pt-8">
                <p>
                    Because everything I just explained may not make sense or
                    simply because you are curious, you might want to go and see
                    what the source code looks like and eventually, if you feel
                    motivated, contribute to improve it.
                </p>
                <p>
                    And if it made sense, or not, you might want to follow me on
                    Twitter where we usually talk about Web development and
                    where I document almost every project that I do. I'm sure
                    you will learn something there!
                </p>
            </div>
        </section>
    );
}

function Share(): JSX.Element {
    return (
        <section
            id="share"
            className="bg-primary-100 text-primary-900 dark:bg-primary-900 dark:bg-opacity-50 dark:text-primary-50 py-16"
        >
            <div className="container flex flex-col lg:flex-row lg:items-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="flex-1">
                    <h3 className="text-primary-500">The more you know</h3>
                    <div className="max-w-4xl space-y-2">
                        <p>
                            To look at the source code, or not. To follow me, or
                            not. The choices are yours 😎
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link
                        href="https://github.com/hugovntr/colorshades"
                        prefetch={false}
                    >
                        <a
                            className="button dark:bg-background dark:text-strong dark:hover:bg-opacity-50"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon className="w-6 h-6" />
                            <span>
                                Source{" "}
                                <span className="hidden sm:inline">code</span>
                            </span>
                        </a>
                    </Link>
                    <Link href="https://twitter.com/hugovntr" prefetch={false}>
                        <a
                            className="button primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TwitterIcon className="w-6 h-6" />
                            <span>Follow me</span>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}
