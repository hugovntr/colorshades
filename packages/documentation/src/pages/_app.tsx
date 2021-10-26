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
                <Component {...pageProps} />
            </ShadesProvider>
        </SchemeProvider>
    );
}
