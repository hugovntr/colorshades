import { SchemeSwitcher } from "@/contexts/SchemeContext";
import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { ColorShadesIcon, GithubIcon, TwitterIcon } from "@/components/icons";

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
    return (
        <div>
            <div
                id="nav"
                className="container py-6 lg:mb-12 flex justify-between items-center"
            >
                <div className="flex items-center space-x-6">
                    <Link href="/" prefetch={false}>
                        <a className="text-strong">
                            <ColorShadesIcon className="w-12 h-12" />
                        </a>
                    </Link>

                    <nav className="divide-x divide-smooth">
                        <Link href="/" prefetch={false}>
                            <a
                                className={`px-3 font-medium ${
                                    asPath === "/" ? "text-primary-500" : ""
                                }`}
                            >
                                Shades
                            </a>
                        </Link>
                        <Link href="/combinations" prefetch={false}>
                            <a
                                className={`px-3 font-medium ${
                                    asPath.includes("combinations")
                                        ? "text-primary-500"
                                        : ""
                                }`}
                            >
                                Combinations
                            </a>
                        </Link>
                        <Link
                            href="/docs/getting-started/installation"
                            prefetch={false}
                        >
                            <a
                                className={`px-3 font-medium ${
                                    asPath.includes("docs")
                                        ? "text-primary-500"
                                        : ""
                                }`}
                            >
                                Docs
                            </a>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-6">
                    <SchemeSwitcher />
                </div>
            </div>
        </div>
    );
}

function Footer(): JSX.Element {
    return (
        <footer className="container py-8 flex flex-col md:flex-row md:justify-between md:items-center">
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
                    <Link href="https://twitter.com/hugovntr" prefetch={false}>
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
        </footer>
    );
}
