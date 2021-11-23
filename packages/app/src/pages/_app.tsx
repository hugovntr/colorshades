import CombinationsProvider from "@/contexts/CombinationsContext";
import SchemeProvider from "@/contexts/SchemeContext";
import ShadesProvider from "@/contexts/ShadesContext";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import "../styles/app.css";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <SchemeProvider>
            <ShadesProvider>
                <CombinationsProvider>
                    <Component {...pageProps} />
                </CombinationsProvider>
            </ShadesProvider>
        </SchemeProvider>
    );
}
