import useShades from "@/hooks/useShades";
import { Combination, CombinationType, createCombination } from "colorshades";
import { createContext, useCallback, useEffect, useState } from "react";

type CombinationsContextType = {
    combinations: Combination;
    type: CombinationType;
    setType: (newType: CombinationType) => void;
};

export const CombinationsContext = createContext<CombinationsContextType>({
    combinations: null,
    type: "opposite",
    setType: () => {},
});

const CombinationsProvider = ({ children }) => {
    const [combinations, setCombinations] = useState<Combination>(
        createCombination("#A5DF36", "opposite")
    );
    const [type, setType] = useState<CombinationType>("opposite");
    const { color } = useShades();

    useEffect(() => {
        setCombinations(() => createCombination(color, type));
    }, [color, type]);

    useEffect(() => {
        const { red, green, blue } = combinations.colors[1];

        document.documentElement.style.setProperty(
            `--color-secondary`,
            `${red}, ${green}, ${blue}`
        );
    }, [combinations]);

    return (
        <CombinationsContext.Provider
            value={{
                combinations,
                type,
                setType,
            }}
        >
            {children}
        </CombinationsContext.Provider>
    );
};

export default CombinationsProvider;
