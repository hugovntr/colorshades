import { SchemeSwitcher } from "@/contexts/SchemeContext";
import { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
    ColorShadesIcon,
    GithubIcon,
    MenuIcon,
    TwitterIcon,
} from "@/components/icons";

type AppProps = {
    children: ReactNode | undefined;
    title?: string;
};

export default function App(props: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{props.title ?? "ColorShades"}</title>

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon_180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon_32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon_16.png"
                />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/favicon.ico"
                />
                <meta
                    content="Create unique color shades in seconds"
                    name="description"
                />
                <meta property="og:url" content="https://colorshades.app" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="ColorShades" />
                <meta
                    property="og:description"
                    content="Create unique color shades in seconds"
                />
                <meta property="og:title" content="ColorShades" />
                <meta
                    property="og:image"
                    content="https://colorshades.app/banner.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@hugovntr" />
                <meta name="twitter:creator" content="@hugovntr" />
                <meta name="twitter:title" content="ColorShades" />
                <meta
                    name="twitter:description"
                    content="Create unique color shades in seconds"
                />
            </Head>
            <Navigation />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}

function Navigation(): JSX.Element {
    const { asPath } = useRouter();
    const [isOpen, setOpen] = useState<boolean>(false);

    const nav = [
        { name: "Shades", href: "/", isActive: asPath === "/" },
        {
            name: "Combinations",
            href: "/combinations",
            isActive: asPath.includes("combinations"),
        },
        {
            name: "Docs",
            href: "/docs/getting-started/installation",
            isActive: asPath.includes("docs"),
        },
    ];

    return (
        <header>
            <div
                id="nav"
                className="container py-6 lg:mb-12 flex justify-between items-center relative"
            >
                <Link href="/" prefetch={false}>
                    <a className="text-strong mr-6">
                        <ColorShadesIcon className="w-12 h-12" />
                    </a>
                </Link>

                <div className="flex-1 md:hidden">
                    <button
                        onClick={() => setOpen((state) => !state)}
                        className="flex items-center space-x-2 border-l border-accents pl-6"
                    >
                        <MenuIcon className="w-5 h-5" />
                        <span>Menu</span>
                    </button>
                </div>

                <div
                    className={`bg-page md:bg-transparent flex-1 md:relative absolute inset-x-0 bottom-0 pb-4 md:py-0 md:translate-y-0 md:opacity-100 md:pointer-events-auto transition duration-300 ${
                        isOpen
                            ? "translate-y-full"
                            : "translate-y-0 opacity-0 pointer-events-none"
                    }`}
                >
                    <nav className="divide-x divide-accents">
                        {nav.map(({ name, href, isActive }) => (
                            <Link href={href} prefetch={false} key={href}>
                                <a
                                    className={`px-3 font-medium ${
                                        isActive ? "text-primary-500" : ""
                                    }`}
                                >
                                    {name}
                                </a>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-6">
                    <SchemeSwitcher />
                </div>
            </div>
        </header>
    );
}

function Footer(): JSX.Element {
    return (
        <footer className="bg-accents bg-opacity-20">
            <div className="container py-8 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col md:flex-row items-center">
                    <ColorShadesIcon className="w-12 h-12 text-strong" />
                </div>
                <div className="flex items-center">
                    <div className="space-x-6 flex items-center">
                        <Link
                            href="https://github.com/hugovntr/colorshades"
                            prefetch={false}
                        >
                            <a className="text-smooth hover:text-primary-500 transition-colors duration-150">
                                <GithubIcon className="w-6 h-6" />
                            </a>
                        </Link>
                        <Link
                            href="https://twitter.com/hugovntr"
                            prefetch={false}
                        >
                            <a
                                className="text-smooth hover:text-primary-500 transition-colors duration-150"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterIcon className="w-6 h-6" />
                            </a>
                        </Link>
                    </div>
                    <div className="ml-auto md:ml-6 md:border-l border-smooth pl-3">
                        <SchemeSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
}
