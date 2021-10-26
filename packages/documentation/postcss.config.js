function toTailwind(value) {
    hex = value.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map(function (hex) {
                return hex + hex;
            })
            .join("");
    }
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(rgb[1], 16),
        parseInt(rgb[2], 16),
        parseInt(rgb[3], 16),
    ].join(",");
}

module.exports = {
    plugins: {
        "postcss-functions": {
            functions: { toTailwind },
        },
        tailwindcss: {},
        autoprefixer: {},
    },
};
