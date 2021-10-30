import { DuplicateIcon } from "./icons";
import commands from "@/libs/commands";
import useScheme from "@/hooks/useScheme";
import { FormEvent, useEffect, useRef, useState } from "react";
import useComponentVisible from "@/hooks/useComponentVisible";
import { useRouter } from "next/router";
import { DocumentationLink } from "@/libs/navigation";
import useSearch from "@/hooks/useSearch";

export default function Spotlight({
    initial,
}: {
    initial: DocumentationLink[];
}): JSX.Element {
    const { ref, visible, setVisible } = useComponentVisible(false);
    const [activeItem, setActiveItem] = useState(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { change } = useScheme();
    const router = useRouter();
    const [searchResult, setQuery] = useSearch([
        ...initial.reduce((all, current) => {
            const items = current.children.map((child) => ({
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
    };

    const handleActivation = (e: KeyboardEvent) => {
        if (e.metaKey && e.key === "k") {
            setVisible((state) => !state);
        }
    };

    const handleMouseEnter = (item) => {
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
    };

    const handleQueryChange = (e: FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    };

    useEffect(() => {
        if (visible) {
            inputRef.current.focus();
            window.addEventListener("keydown", handleNavigation);
        } else {
            window.addEventListener("keydown", handleActivation);
            setQuery((state) => null);
            inputRef.current.value = "";
            inputRef.current.blur();
        }
        return () => {
            window.removeEventListener("keydown", handleNavigation);
            window.removeEventListener("keydown", handleActivation);
        };
    }, [visible, activeItem, searchResult, setQuery, inputRef]);

    useEffect(() => {
        setActiveItem((state) => searchResult[0]);
    }, [searchResult, setActiveItem]);

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
                className={`bg-background shadow-xl rounded-2xl max-w-2xl mx-auto mt-32 transition-transform duration-700 ${
                    visible
                        ? "translate-y-0"
                        : "-translate-y-8 motion-reduce:translate-y-0"
                }`}
            >
                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleQueryChange}
                    className="appearance-none bg-background w-full px-4 py-3 border-b border-smooth rounded-t-2xl outline-none"
                    placeholder="Search something..."
                />

                <div className="p-4 space-y-3">
                    <p className="text-sm">
                        Prefix your search with <kbd>&gt;</kbd> for commands
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
                isActive ? "bg-page" : ""
            }`}
        >
            <DuplicateIcon className="w-5 h-5" />
            <div className="flex-1">
                <p className="leading-5 text-strong">{name}</p>
                <span className="text-xs">{category}</span>
            </div>
            <p
                className={`text-sm opacity-0 translate-x-4 transition duration-300 ${
                    isActive ? "translate-x-0 opacity-100" : ""
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
                isActive ? "bg-page" : ""
            } `}
        >
            <Icon className="w-5 h-5" />
            <div className="flex-1">
                <p className="leading-5 text-strong">{name}</p>
            </div>
        </div>
    );
}
