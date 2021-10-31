---
title: "Create shades"
order: 2
---

The `createShades()` function is the core of [ColorShades](/). It takes a single color as an argument, compute all the other colors in the shades, match them with our reference database and output an object that includes all of those colors.

Read our [how it works section](/#how-it-works) if you want to know exactly how and why **ColorShades** works.

## Input

As of now, only _hexadecimal_ is supported for the `createShades()` function. I plan to add all the missing input options in future updates, but if you want them earlier, feel free to make a pull request.

```javascript
// ✅ From an hexadecimal color
createShades("#A5DF36");

// 🟥 From a color name
createShades("rebeccapurple");

// 🟥 From an rgb string
createShades("rgb(255, 250, 140)");

// 🟥 From an hsl string
createShades("hsl(0, 100%, 60%)");
```

## Output

The return value of the `createShades()` function is of type `Shades`. If you want to access the list of colors in the shades, you can do so by interacting with the array.

```javascript
const shades = createShades("#A5DF36");
console.log(shades.colors);
/* 
[
    Color,
    Color,
    ...
]
*/
```

### Types

The raw types used by the algorithm.

**Shades**

```typescript
export type Shades = {
    colors: Color[];
    name: string;

    toJSON: () => { [key: number]: string };
};
```

**Color**

```typescript
export type Color = {
    red: number;
    green: number;
    blue: number;

    hue: number;
    saturation: number;
    luminance: number;

    hex: string;
    rgb: string;
    hsl: string;

    index: number;
    brightness: number;
    isDark: boolean;
    isGray: boolean;

    toString: () => string;
    toJSON: () => { [key: number]: string };
};
```
