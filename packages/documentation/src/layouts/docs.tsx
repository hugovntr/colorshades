import { ReactNode } from "react";
import Link from "next/link";
import App from "./app";
import { DocumentationLink } from "@/libs/navigation";

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
            <div className="container space-x-4 flex">
                <nav className="text-lg">
                    {props.navigation.map((link) => (
                        <NavigationElement {...link} />
                    ))}
                </nav>
                <div className="flex-1">{props.children}</div>
            </div>
        </App>
    );
}

function NavigationElement(element: DocumentationLink): JSX.Element {
    if (!element.children) return <NavigationRootItem {...element} />;
    return <NavigationParent {...element} />;
}

function NavigationRootItem({ name, path }: DocumentationLink): JSX.Element {
    return (
        <Link href={path}>
            <a>{name}</a>
        </Link>
    );
}

function NavigationParent({ name, children }: DocumentationLink): JSX.Element {
    return (
        <div>
            <p>{name}</p>
            <ul>
                {children.map((child) => (
                    <NavigationChildren key={child.slug} {...child} />
                ))}
            </ul>
        </div>
    );
}

function NavigationChildren({ name, path }: DocumentationLink): JSX.Element {
    return (
        <li>
            <Link href={path}>
                <a>{name}</a>
            </Link>
        </li>
    );
}
