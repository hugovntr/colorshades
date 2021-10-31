import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import App from "./app";
import { DocumentationLink } from "@/libs/navigation";
import { CommandIcon, MinimizeIcon } from "@/components/icons";
import { useRouter } from "next/router";
import Spotlight from "@/components/spotlight";

type DocsProps = {
    children: ReactNode | undefined;
    title?: string;
    navigation: DocumentationLink[];
};

export default function Docs(props: DocsProps): JSX.Element {
    const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);

    const handleSpotlightClose = () => {
        setSpotlightOpen((state) => false);
    };

    return (
        <App
            title={
                props.title
                    ? `${props.title} | ColorShades Documentation`
                    : "ColorShades Documentation"
            }
        >
            <Spotlight
                initial={props.navigation}
                open={spotlightOpen}
                onClose={handleSpotlightClose}
            />
            <div className="container space-x-4 flex flex-col md:flex-row md:items-start space-y-8 md:space-x-16 md:space-y-0">
                <div className="space-y-3">
                    <button
                        onClick={() => setSpotlightOpen(true)}
                        className="button bg-accents text-base hidden md:flex justify-between items-center w-full md:w-44 group"
                    >
                        <span className="text-strong">Search</span>
                        <span className="inline-flex space-x-1 group-hover:opacity-0 transition-opacity duration-150">
                            <kbd className="bg-smooth text-foreground dark:bg-accents">
                                <CommandIcon className="w-4 h-4" />
                            </kbd>
                            <kbd className="bg-smooth text-foreground dark:bg-accents">
                                K
                            </kbd>
                        </span>
                    </button>
                    <nav>
                        {props.navigation.map((link) => (
                            <NavigationElement {...link} key={link.slug} />
                        ))}
                    </nav>
                </div>
                <div className="flex-1">{props.children}</div>
            </div>
        </App>
    );
}

function NavigationElement(element: DocumentationLink): JSX.Element {
    if (!element.children) return <NavigationRootLink {...element} />;
    return <NavigationParent {...element} />;
}

function NavigationRootLink({ name, path }: DocumentationLink): JSX.Element {
    return (
        <Link href={path}>
            <a>{name}</a>
        </Link>
    );
}

function NavigationParent({ name, children }: DocumentationLink): JSX.Element {
    const [isOpen, open] = useState<boolean>(false);
    const { asPath } = useRouter();

    useEffect(() => {
        const isChild = children.find((child) => child.path === asPath);
        if (isChild) {
            open(true);
        }
    }, [asPath]);

    return (
        <div>
            <button
                onClick={() => open((state) => !state)}
                className={`inline-flex items-center font-semibold space-x-2 group ${
                    isOpen ? "text-strong" : ""
                }`}
            >
                <MinimizeIcon
                    className={`w-6 h-6 text-smooth group-hover:text-primary-500 transition-colors duration-150 ${
                        isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                />
                <span>{name}</span>
            </button>
            <ul
                className={`border-l border-smooth ml-3 mb-4 pl-4 text-base space-y-2 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                {children.map((child) => (
                    <NavigationChildren key={child.slug} {...child} />
                ))}
            </ul>
        </div>
    );
}

function NavigationChildren({ name, path }: DocumentationLink): JSX.Element {
    const { asPath } = useRouter();
    return (
        <li>
            <Link href={path}>
                <a
                    className={`ml-3 ${
                        asPath.includes(path)
                            ? "text-primary-500"
                            : "hover:text-strong transition-colors duration-150"
                    }`}
                >
                    {name}
                </a>
            </Link>
        </li>
    );
}
