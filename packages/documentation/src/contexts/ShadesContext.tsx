// import createShades, { Color, createColor, Shades } from "@/lib/shades";
import createShades, { createColor, Color, Shades } from "colorshades";
import { createContext, useCallback, useEffect, useState } from "react";

type ShadesContextType = {
    shades: Shades;
    color: Color;
    setColor: (newColor: string) => void;
};

export const ShadesContext = createContext<ShadesContextType>({
    shades: null,
    color: null,
    setColor: (newColor: string) => {},
});

const ShadesProvider = ({ children }) => {
    const [shades, setShades] = useState<Shades>(createShades("#A5DF36"));
    const [color, setUserColor] = useState<Color>(createColor("#A5DF36"));

    const setColor = useCallback(
        (newColor: string) => {
            setUserColor(createColor(newColor));
            setShades(createShades(newColor, 10));
        },
        [color]
    );

    useEffect(() => {
        shades.colors.map(({ index, red, green, blue }) => {
            document.documentElement.style.setProperty(
                `--color-primary-${index}`,
                `${red}, ${green}, ${blue}`
            );
        });
    }, [shades]);

    return (
        <ShadesContext.Provider
            value={{
                shades,
                color,
                setColor,
            }}
        >
            {children}
        </ShadesContext.Provider>
    );
};

export default ShadesProvider;
