import { SchemeSwitcher } from "@/contexts/SchemeContext";
import { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { GithubIcon, TwitterIcon } from "@/components/icons";

type AppProps = {
    children: ReactNode | undefined;
    title?: string;
};

export default function App(props: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{props.title ?? "ColorShades"}</title>
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
                className="container py-6 mb-12 flex justify-between items-center"
            >
                <div className="flex items-center space-x-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-8 h-8 text-primary-500"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth={2}
                            d="M14.375 19.448a3.11 3.11 0 01-4.397 0l-7.422-7.422a1.7 1.7 0 010-2.405l1.991-1.992a1.7 1.7 0 012.406 0L9.023 9.7m5.352 9.748a3.11 3.11 0 000-4.396L9.024 9.7m5.351 9.748l7.422-7.422a1.7 1.7 0 000-2.405l-1.991-1.992a1.7 1.7 0 00-2.406 0l-2.159 2.159m.044 7.526l-.044-7.526M9.024 9.7l-.018-2.8c0-.939.762-1.7 1.701-1.7h2.817c.94 0 1.7.761 1.7 1.7l.017 2.888"
                        />
                        <path
                            fill="currentColor"
                            fillOpacity={0.2}
                            d="M9.567 10.535V5.75h5.261v10.046l-5.261-5.262z"
                        />
                        <path
                            fill="currentColor"
                            fillOpacity={0.4}
                            d="M15.5 10l3-3 4 4-7 6.5V10z"
                        />
                    </svg>
                    <nav className="divide-x divide-smooth">
                        <Link href="/">
                            <a
                                className={`px-3 font-medium ${
                                    asPath === "/" ? "text-primary-500" : ""
                                }`}
                            >
                                Shades
                            </a>
                        </Link>
                        <Link href="/docs">
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
            <p className="text-center md:text-left text-primary-500 font-semibold">
                Colorshades
            </p>
            <div className="flex items-center">
                <div className="space-x-6 flex items-center">
                    <Link href="/" prefetch={false}>
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
