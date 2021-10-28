---
title: "Tailwind"
order: 1
---

**ColorShades** has a fast and easy integration with [TailwindCSS](https://tailwindcss.com). You can generates shades on the fly and see how they fit your design without having to export them each time

## Setup

First, you have to install the `colorshades` package to your application.

```bash
# Using npm
npm install --save-dev colorshades

# Using yarn
yarn add --dev colorshades
```

Once the package is installed, you might go to your current `tailwind.config.js` file and add the following line at the top of the configuration:

```javascript
const shades = require("colorshades/tailwind");
```

Next, you can define you color in the `theme` section of the configuration:

```javascript
theme: {
    extend: {
        colors: {
            // ...
            primary: { ...shades("#A5DF36") }
        }
    }
}
```

Just to make sure, here is a summary of what your final `tailwind.config.js` file should look like

```javascript
const shades = require("colorshades/tailwind");

module.exports = {
    content: [
        // ...
    ],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                // ...
                primary: { ...shades("#A5DF36") },
            },
        },
    },
    plugins: [],
};
```

The cool thing about this setup is that, with Tailwind [Just-In-Time](https://tailwindcss.com/docs/just-in-time-mode) mode, you can easily change the color used in the `shades()` function and instantly see the result.

### Without spread syntax (...)

If you do not want, or can not use the [Spread syntax(...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in your `tailwind.config.js` you can assign the result of the `shades()` function to a variable and use it in the `theme` section:

```javascript
const shades = require("colorshades/tailwind");

const primaryShades = shades("#A5DF36");

module.exports = {
    // ...
    theme: {
        extend: {
            colors: {
                // ...
                primary: primaryShades,
            },
        },
    },
};
```
