const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");
const shades = require("colorshades/tailwind");

const handleOpacity = (name, { opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined)
        return `rgba(var(--${name}), ${opacityValue})`;
    if (opacityVariable !== undefined)
        return `rgba(var(--${name}), var(${opacityVariable}, 1))`;
    return `var(--${name})`;
};

const defaultColors = () => {
    let names = ["page", "background", "foreground", "strong", "smooth"];

    let colorsObj = {};
    for (let i = 0; i < names.length; i++) {
        colorsObj[names[i]] = ({ opacityVariable, opacityValue }) =>
            handleOpacity(`color-${names[i]}`, {
                opacityVariable,
                opacityValue,
            });
    }
    return colorsObj;
};

const makeShades = (name) => {
    let indexes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    let colorsObj = {};
    for (let i = 0; i < indexes.length; i++) {
        colorsObj[indexes[i]] = ({ opacityVariable, opacityValue }) =>
            handleOpacity(`color-${name}-${indexes[i]}`, {
                opacityVariable,
                opacityValue,
            });
    }
    return colorsObj;
};

module.exports = {
    darkMode: "class",
    mode: "jit",
    purge: {
        content: [
            "./src/**/*.{ts,js,tsx,jsx,mdx}",
            "./public/**/*.html",
            "./safelist.txt",
        ],
    },
    theme: {
        fontFamily: {
            ...fontFamily,
            sans: ["Inter", ...fontFamily.sans],
        },
        colors: {
            black: colors.black,
            white: colors.white,
            gray: colors.coolGray,
            transparent: "transparent",

            green: colors.green,
            red: colors.red,

            primary: { ...makeShades("primary") },
            ...defaultColors(),
        },

        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: `rgb(${theme("colors.foreground")})`,
                        strong: {
                            color: `rgb(${theme("colors.strong")})`,
                        },
                        "h1, h2, h3, h4": {
                            color: `rgb(${theme("colors.strong")})`,
                        },
                        h1: {
                            fontSize: null,
                        },
                        h2: {
                            fontSize: null,
                        },
                        h3: {
                            fontSize: null,
                        },
                        h4: {
                            fontSize: null,
                        },
                        code: {
                            color: `rgb(${theme("colors.strong")})`,
                        },
                    },
                },
            }),
        },
    },
    corePlugins: {
        container: false,
    },
    variants: {
        typography: [],
    },
    plugins: [require("@tailwindcss/typography")({ modifiers: [] })],
};
