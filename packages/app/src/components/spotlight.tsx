import { DuplicateIcon } from "./icons";
import commands from "@/libs/commands";
import useScheme from "@/hooks/useScheme";
import { FormEvent, useEffect, useRef, useState } from "react";
import useComponentVisible from "@/hooks/useComponentVisible";
import { useRouter } from "next/router";
import { DocumentationLink } from "@/libs/navigation";
import useSearch from "@/hooks/useSearch";

type SpotlightProps = {
    initial: DocumentationLink[];
    onClose: () => void;
    open?: boolean;
};

export default function Spotlight({
    initial,
    onClose,
    open = false,
}: SpotlightProps): JSX.Element {
    const { ref, visible, setVisible } = useComponentVisible(false, onClose);
    const [activeItem, setActiveItem] = useState<SpotlightItem>(null);
    const [commandMode, setCommandMode] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { change } = useScheme();
    const router = useRouter();
    const [searchResult, setSearchQuery] = useSearch<SpotlightItem>([
        ...initial.reduce((all, current) => {
            const items = current.children.map<SpotlightItem>((child) => ({
                name: child.name,
                type: "document",
                category: current.name,
                action: {
                    type: "visit",
                    value: child.path,
                },
            }));

            return [...all, ...items];
        }, []),
        ...commands,
    ]);

    const handleNavigation = (e: KeyboardEvent) => {
        const index = searchResult.findIndex(
            (item) => item.name === activeItem?.name
        );

        const actionKeys = ["ArrowDown", "ArrowUp", "Enter"];
        if (actionKeys.includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case "ArrowDown":
                setActiveItem(searchResult[index + 1] ?? activeItem);
                break;
            case "ArrowUp":
                setActiveItem(searchResult[index - 1] ?? activeItem);
                break;
            case "Enter":
                if (activeItem) {
                    executeAction(activeItem.action);
                }
                break;

            default:
                break;
        }

        if (e.key === "Backspace") {
            if (!inputRef.current.value && commandMode) {
                setCommandMode((state) => false);
            }
        }
    };

    const handleActivation = (e: KeyboardEvent) => {
        if (e.metaKey && e.key === "k") {
            e.preventDefault();
            setVisible((state) => !state);
        }
    };

    const handleMouseEnter = (item: SpotlightItem) => {
        setActiveItem(item);
    };

    const executeAction = ({ type, value }) => {
        switch (type) {
            case "visit":
                router.push(value);
                break;

            case "scheme":
                change(value);

            default:
                break;
        }

        setVisible((state) => !state);
        onClose();
    };

    const handleQueryChange = (e: FormEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (value.startsWith(">")) {
            setCommandMode(true);
            inputRef.current.value = inputRef.current.value.substr(1);
            value = value.substr(1);
        }
        setQuery((state) => value);
    };

    useEffect(() => {
        setSearchQuery({
            type: commandMode ? "command" : null,
            value: query,
        });
    }, [query, commandMode]);

    useEffect(() => {
        if (visible) {
            inputRef.current.focus();
            window.addEventListener("keydown", handleNavigation);
        } else {
            window.addEventListener("keydown", handleActivation);
            setSearchQuery((state) => null);
            setQuery((state) => "");
            setCommandMode((state) => false);
            inputRef.current.value = "";
            inputRef.current.blur();
        }
        return () => {
            window.removeEventListener("keydown", handleNavigation);
            window.removeEventListener("keydown", handleActivation);
        };
    }, [
        visible,
        activeItem,
        searchResult,
        setSearchQuery,
        inputRef,
        setCommandMode,
        setQuery,
    ]);

    useEffect(() => {
        setActiveItem((state) => searchResult[0]);
    }, [searchResult, setActiveItem]);

    useEffect(() => {
        setVisible((state) => open);
    }, [open]);

    return (
        <div
            className={`fixed inset-0 z-20 bg-black bg-opacity-30 transition-opacity duration-150 ${
                visible
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                ref={ref}
                className={`bg-background dark:bg-page dark:border border-smooth shadow-xl rounded-2xl max-w-2xl mx-auto mt-32 transition-transform duration-700 ${
                    visible
                        ? "translate-y-0"
                        : "-translate-y-8 motion-reduce:translate-y-0"
                }`}
            >
                <div className="bg-background dark:bg-page w-full border-b border-smooth rounded-t-2xl overflow-hidden flex items-center">
                    {commandMode && <kbd className="px-2 ml-4">Command</kbd>}
                    <input
                        type="text"
                        ref={inputRef}
                        onChange={handleQueryChange}
                        className="appearance-none flex-1 px-4 py-3 bg-background dark:bg-page outline-none"
                        placeholder="Search something..."
                    />
                </div>

                <div className="p-4 space-y-3">
                    <p className="text-sm">
                        {!commandMode ? (
                            <>
                                Prefix your search with <kbd>&gt;</kbd> for
                                commands
                            </>
                        ) : (
                            <>
                                Clear your search and press <kbd>Backspace</kbd>{" "}
                                to exit command search
                            </>
                        )}
                    </p>
                    <div className="grid gap-2">
                        {searchResult.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={(e) => handleMouseEnter(item)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    executeAction(item.action);
                                }}
                            >
                                <SpotlightItem
                                    item={item}
                                    isActive={activeItem?.name === item.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpotlightItem({ item, isActive }): JSX.Element {
    const { type } = item;
    const [active, setActive] = useState<boolean>(isActive);
    const Component =
        type === "command" ? SpotlightCommandItem : SpotlightDocumentItem;

    useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    return <Component {...item} isActive={active} />;
}

function SpotlightDocumentItem({ name, category, isActive }): JSX.Element {
    return (
        <div
            className={`flex items-start p-2 -mx-2 space-x-2 rounded-lg transition-colors duration-150 cursor-pointer ${
                isActive ? "bg-page dark:bg-background" : ""
            }`}
        >
            <DuplicateIcon className="w-5 h-5" />
            <div className="flex-1">
                <p className="leading-5 text-strong">{name}</p>
                <span className="text-xs">{category}</span>
            </div>
            <p
                className={`text-sm transition duration-300 ${
                    isActive
                        ? "translate-x-0 opacity-100"
                        : "opacity-0 translate-x-4"
                }`}
            >
                Jump to
            </p>
        </div>
    );
}

function SpotlightCommandItem({ name, Icon, isActive }): JSX.Element {
    return (
        <div
            className={`flex items-start p-2 -mx-2 space-x-2 rounded-lg transition-colors duration-150 cursor-pointer ${
                isActive ? "bg-page dark:bg-background" : ""
            } `}
        >
            <Icon className="w-5 h-5" />
            <div className="flex-1">
                <p className="leading-5 text-strong">{name}</p>
            </div>
        </div>
    );
}
