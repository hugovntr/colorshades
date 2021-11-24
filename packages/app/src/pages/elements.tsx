import Picker from "@/components/picker";
import App from "@/layouts/app";
import { Color, createColor } from "colorshades";
import { NextPage } from "next";
import { useState } from "react";

const ElementsPage: NextPage = () => {
    const [pickerColor, setPickerColor] = useState<Color>(
        createColor("#A5DF36")
    );
    return (
        <App>
            <div className="container">
                <h1>Interface Elements</h1>
            </div>

            <div className="container">
                <Picker color={pickerColor} />
            </div>
        </App>
    );
};

export default ElementsPage;
