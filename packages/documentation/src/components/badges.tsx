import { Color, createColor } from "colorshades";

export function ColorBadge({
    color,
    className = "",
}: {
    color: Color | string;
    className?: string;
}): JSX.Element {
    if (typeof color === "string") {
        color = createColor(color);
    }

    return (
        <span className={`inline-flex items-baseline space-x-1 ${className}`}>
            <span
                className={`w-4 h-4 rounded border-foreground ${
                    color.isDark ? "" : "border-2"
                }`}
                style={{ backgroundColor: color.rgb }}
            ></span>
            <span className="font-semibold text-strong uppercase">
                {color.hex.slice(1)}
            </span>
        </span>
    );
}
