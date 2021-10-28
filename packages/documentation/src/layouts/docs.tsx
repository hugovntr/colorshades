import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import App from "./app";
import { DocumentationLink } from "@/libs/navigation";
import { MinimizeIcon } from "@/components/icons";
import { useRouter } from "next/router";

type DocsProps = {
    children: ReactNode | undefined;
    title?: string;
    navigation: DocumentationLink[];
};

export default function Docs(props: DocsProps): JSX.Element {
    return (
        <App
            title={
                props.title
                    ? `${props.title} | ColorShades Documentation`
                    : "ColorShades Documentation"
            }
        >
            <div className="container space-x-4 flex items-start md:space-x-16">
                <nav className="space-y-3">
                    {props.navigation.map((link) => (
                        <NavigationElement {...link} key={link.slug} />
                    ))}
                </nav>
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
                className={`border-l border-smooth ml-3 pl-4 text-base space-y-2 ${
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
