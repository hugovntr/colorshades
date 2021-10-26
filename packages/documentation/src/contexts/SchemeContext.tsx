import {
    DarkIcon,
    LightIcon,
    SelectIcon,
    SystemIcon,
} from "@/components/icons";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const SYSTEM = "system";
const DARK = "dark";
const LIGHT = "light";

const setDark = () => {
    document.documentElement.classList.add(DARK);
};

const setLight = () => {
    document.documentElement.classList.remove(DARK);
};

const setStorage = (value: Scheme) => {
    localStorage.setItem("scheme", value);
};

const getStorage = (): Scheme => {
    return (localStorage.getItem("scheme") as Scheme) || SYSTEM;
};

const systemMode = (matches: boolean) => {
    if (matches) setDark();
    else setLight();
};

type Scheme = "system" | "dark" | "light";

type SchemeContextType = {
    scheme: Scheme;
    change: (newScheme: Scheme) => void;
};

const SchemeContext = createContext<SchemeContextType>({
    scheme: SYSTEM,
    change: () => {},
});

const SchemeProvider = ({ children }) => {
    const [scheme, setScheme] = useState<Scheme>(SYSTEM);
    const [loaded, setLoaded] = useState<boolean>(false);

    const change = useCallback(
        (newScheme: Scheme) => {
            setScheme(newScheme);
        },
        [scheme]
    );

    const handleMediaChanged = (e: MediaQueryListEvent) => {
        if (getStorage() === SYSTEM) {
            systemMode(e.matches);
        }
    };

    const addListeners = () => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleMediaChanged);
    };

    const removeListeners = () => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", handleMediaChanged);
    };

    useEffect(() => {
        if (loaded) {
            switch (scheme) {
                case LIGHT:
                    setLight();
                    setStorage(LIGHT);
                    break;
                case DARK:
                    setDark();
                    setStorage(DARK);
                    break;
                default:
                    systemMode(
                        window.matchMedia("(prefers-color-scheme: dark)")
                            .matches
                    );
                    setStorage(SYSTEM);
                    break;
            }

            if (scheme === SYSTEM) {
                addListeners();
                return () => removeListeners();
            }
        }
    }, [scheme, loaded]);

    // Initial state
    useEffect(() => {
        change(getStorage());
        setLoaded(true);
    }, []);

    return (
        <SchemeContext.Provider
            value={{
                scheme,
                change,
            }}
        >
            {children}
        </SchemeContext.Provider>
    );
};

const SchemeSwitcher = (): JSX.Element => {
    const { scheme, change } = useContext<SchemeContextType>(SchemeContext);

    const handleSchemeChange = (e) => {
        change(e.currentTarget.value);
    };

    const Icon = (props) => {
        switch (scheme) {
            case LIGHT:
                return <LightIcon {...props} />;
            case DARK:
                return <DarkIcon {...props} />;
            default:
                return <SystemIcon {...props} />;
        }
    };
    return (
        <div
            id="scheme-switcher"
            className="flex items-center relative rounded-xl group"
        >
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <Icon className="w-5 h-5 text-smooth group-hover:text-strong transition-colors duration-150" />
            </div>
            <select
                onChange={handleSchemeChange}
                aria-label="Change theme"
                value={scheme}
                className="px-8 appearance-none bg-transparent outline-none cursor-pointer"
            >
                <option value={SYSTEM}>System</option>
                <option value={LIGHT}>Light</option>
                <option value={DARK}>Dark</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <SelectIcon className="w-5 h-5 text-smooth group-hover:text-primary-500 transition-colors duration-150" />
            </div>
        </div>
    );
};

export { SchemeSwitcher, SchemeContext };
export default SchemeProvider;
