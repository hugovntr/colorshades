import { Color, createColor } from "colorshades";
import { ChangeEvent, CSSProperties, useState } from "react";

interface PickerProps {
    color: Color;
}

export default function Picker({ color: baseColor }: PickerProps): JSX.Element {
    const [hue, setHue] = useState<number>(baseColor.hue);
    const [saturation, setSaturation] = useState<number>(
        baseColor.saturation * 100
    );
    const [luminance, setLuminance] = useState<number>(
        baseColor.luminance * 100
    );

    return (
        <div
            className="picker"
            style={
                {
                    "--picker-selected-hue": hue,
                    "--picker-selected-saturation": `${saturation}%`,
                    "--picker-selected-luminance": `${luminance}%`,
                } as CSSProperties
            }
        >
            <div className="picker__display"></div>
            <div className="p-4 pt-2 space-y-4">
                <PickerSlider
                    name="hue"
                    min={0}
                    max={360}
                    defaultValue={hue}
                    onChange={setHue}
                />
                <PickerSlider
                    name="saturation"
                    min={0}
                    max={100}
                    defaultValue={saturation}
                    onChange={setSaturation}
                />
                <PickerSlider
                    name="luminance"
                    min={0}
                    max={100}
                    defaultValue={luminance}
                    onChange={setLuminance}
                />
            </div>
        </div>
    );
}

interface PickerSliderProps {
    name: string;
    min: number;
    max: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

function PickerSlider({
    name,
    min,
    max,
    defaultValue = 0,
    onChange,
}: PickerSliderProps): JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(parseInt(e.currentTarget.value));
        }
    };

    return (
        <div className="picker-slider">
            <p className="capitalize">{name}</p>
            <input
                className={`picker-slider__${name}`}
                type="range"
                name={name}
                defaultValue={defaultValue}
                min={min}
                max={max}
                onChange={handleChange}
            />
        </div>
    );
}
