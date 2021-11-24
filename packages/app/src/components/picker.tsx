import { Color } from "colorshades";

interface PickerProps {
    color: Color;
}

export default function Picker({ color: baseColor }: PickerProps): JSX.Element {
    console.log(baseColor.hsl);
    return (
        <div className="picker">
            <div
                className="picker__spectrum"
                style={{ backgroundColor: baseColor.hex }}
            ></div>
            <div className="picker__hue"></div>
        </div>
    );
}
