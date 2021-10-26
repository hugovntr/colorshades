import { Color } from "colorshades";
import { useState, useEffect, MouseEvent } from "react";
import { CloseIcon, MinimizeIcon } from "./icons";

export function ColorToast({
    color: currentColor = null,
}: {
    color?: Color;
}): JSX.Element {
    const [isOpen, open] = useState<boolean>(true);
    const [color, setColor] = useState<Color>(currentColor);

    const vanish = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setColor(null);
    };

    const maximize = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        open(true);
    };

    const minimize = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        open(false);
    };

    useEffect(() => {
        open(true);
        setColor(currentColor);
    }, [currentColor, open]);

    if (!color) {
        return null;
    }

    if (!isOpen) {
        return (
            <div className="fixed left-4 sm:left-auto bottom-4 right-4 bg-background p-4 max-w-xs z-10 rounded-3xl shadow-2xl flex items-center space-x-3">
                <div
                    onClick={maximize}
                    className="flex items-center space-x-3 cursor-pointer flex-1 overflow-hidden"
                >
                    <figure
                        className="rounded-xl w-12 h-12 transition-colors duration-300 flex justify-end items-start"
                        style={{ backgroundColor: color.rgb }}
                    ></figure>
                    <div className="flex-1 leading-none overflow-hidden">
                        <p className="text-strong text-lg leading-none mb-1">
                            {color.hex}
                        </p>
                        <p className="truncate">{color.hsl}</p>
                    </div>
                </div>
                <button onClick={vanish} className="button p-4 rounded-full">
                    <CloseIcon className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed left-4 sm:left-auto bottom-4 right-4 bg-background p-6 max-w-xs z-10 rounded-3xl shadow-2xl">
            <figure
                className="rounded-xl w-full h-16 lg:h-24 transition-colors duration-300 flex justify-end items-start"
                style={{ backgroundColor: color.rgb }}
            >
                <button
                    onClick={minimize}
                    className="bg-black text-primary-50 bg-opacity-20 hover:bg-opacity-50 transition-colors py-1 px-3 rounded-bl-md"
                >
                    <MinimizeIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={vanish}
                    className="bg-black text-primary-50 bg-opacity-20 hover:bg-opacity-50 transition-colors py-1 px-3 rounded-tr-xl"
                >
                    <CloseIcon className="w-5 h-5" />
                </button>
            </figure>
            <p className="text-strong text-lg mt-4 leading-none select-all">
                {color.hex}
            </p>
            <p className="mb-4">{color.index}</p>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <p className="text-xs text-smooth">RGB</p>
                    <p className="truncate select-all">{color.rgb}</p>
                </div>
                <div>
                    <p className="text-xs text-smooth">HSL</p>
                    <p className="truncate select-all">{color.hsl}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-smooth">BRIGHTNESS</p>
                    <p className="truncate select-all">{color.brightness}</p>
                </div>
            </div>
        </div>
    );
}
