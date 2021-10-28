---
title: "Installation"
order: 1
---

One of the cool things about **ColorShades** is its versatility. You don't have to use a framework like [TailwindCSS](https://tailwindcss.com) or a transforming tool like [PostCSS](https://postcss.org) to use it.

You can simply include it in any Javascript or Typescript project and create shades on the fly!

## Setup

First of all, you have to add **ColorShades** to your project using `npm` or `yarn`

```bash
# Using npm
npm install --save-dev colorshades

# Using yarn
yarn add --dev colorshades
```

Now, whenever you want to use the library, you can simply import it like so:

```javascript
// es6
import createShades from "colorshades";

// standard
const createShades = require("colorshades");
```

## Create shades

While you're at it, might as well continue reading about [How to create shades](/docs/getting-started/create-shades) and what the `createShades()` function will return instead of doing a `console.log()` 😉
