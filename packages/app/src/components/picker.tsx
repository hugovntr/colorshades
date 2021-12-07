import { debounce, hslToHex } from "@/libs/utils";
import { Color, createColor } from "colorshades";
import {
    ChangeEvent,
    CSSProperties,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type SatLum = {
    saturation: number;
    luminance: number;
};
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
    const [hex, setHex] = useState<string>(baseColor.hex);

    const updateHex = useCallback(
        debounce((hue: number, sat: number, lum: number) => {
            setHex(() => hslToHex(hue, sat, lum));
        }, 300),
        []
    );

    useEffect(() => {
        updateHex(hue, saturation, luminance);
    }, [hue, saturation, luminance]);

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
            {/* <PickerSpectrum
                defaultSaturation={saturation}
                defaultLuminance={luminance}
            /> */}
            <div className="picker-display">
                <span className="picker-display__hex">{hex}</span>
            </div>
            <div className="flex flex-col">
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
            <button className="button rounded-none py-2">Select</button>
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
    const [value, setValue] = useState<number>(defaultValue);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: v } = e.currentTarget;
        if (onChange) {
            onChange(parseInt(v));
        }
        setValue(() => parseInt(v));
    };

    return (
        <div className="picker-slider">
            <div className="picker-slider__tooltip">
                <span className="capitalize w-[9ch]">{name}</span>
                <span className="bg-gray-800 w-[4ch] rounded text-center">
                    {value}
                </span>
            </div>
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

type CursorPosition = {
    x: number;
    y: number;
};
interface PickerSpectrumProps {
    defaultSaturation: number;
    defaultLuminance: number;
    onChange?: (value: SatLum) => void;
}

function PickerSpectrum({
    defaultSaturation,
    defaultLuminance,
    onChange,
}: PickerSpectrumProps): JSX.Element {
    const [data, setData] = useState<CursorPosition & SatLum>({
        x: 0,
        y: 0,
        saturation: defaultSaturation,
        luminance: defaultLuminance,
    });
    const [dragging, setDragging] = useState<boolean>(false);
    const cursor = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!dragging) return;
        setData(() => getData(e.clientX, e.clientY));

        e.preventDefault();
        e.stopPropagation();
    };

    const onMouseDown = (e: MouseEvent) => {
        setDragging(() => true);

        e.stopPropagation();
        e.preventDefault();
    };
    const onMouseUp = (e: MouseEvent) => {
        setDragging(() => false);
        e.stopPropagation();
        e.preventDefault();
    };

    const getData = useCallback(
        (left: number, top: number): CursorPosition & SatLum => {
            if (!container.current) data;
            const minLeft = container.current.offsetLeft;
            const maxLeft = container.current.offsetWidth;
            const minTop = container.current.offsetTop;
            const maxTop = container.current.offsetHeight;

            const saturation = parseInt(
                (((left - minLeft) / maxLeft) * 100).toFixed(2)
            );
            const luminance = parseInt(
                (((top - minTop) / maxTop) * 100).toFixed(2)
            );

            return {
                x: (saturation / 100) * maxLeft,
                y: (luminance / 100) * maxTop,
                saturation,
                luminance,
            };
        },
        [container]
    );

    // Event listener
    useEffect(() => {
        if (container.current) {
            container.current.addEventListener("mousedown", onMouseDown);
            container.current.addEventListener("mouseup", onMouseUp);
            return () => {
                container.current.removeEventListener("mousedown", onMouseDown);
                container.current.removeEventListener("mouseup", onMouseUp);
            };
        }
    }, [container, dragging]);

    return (
        <div className="picker-spectrum grid">
            <div className="relative" ref={container} onMouseMove={onMouseMove}>
                <div
                    className="picker-spectrum__cursor left-0 top-0"
                    ref={cursor}
                    style={{
                        transform: `
                            translateX(calc((13rem * ${
                                data.saturation / 100
                            }) - 50%))
                            translateY( calc( 10rem - (10rem * ${
                                data.luminance / 100
                            } + 50%) ) )
                        `,
                    }}
                ></div>
            </div>
        </div>
    );
}
