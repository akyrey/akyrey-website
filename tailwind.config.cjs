/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        secondary: getColorFromVariable("--secondary"),
        tertiary: getColorFromVariable("--tertiary"),
        main: getColorFromVariable("--main"),
      },
    },
  },
  plugins: [],
};

function getColorFromVariable(value) {
  return function (opacity) {
    if (opacity.opacityValue !== undefined) {
      return `rgba(var(${value}), ${opacity.opacityValue})`;
    }

    if (opacity.opacityVariable !== undefined) {
      return `rgba(var(${value}), var(${opacity.opacityVariable}, 1))`;
    }

    return `rgb(var(${value}))`;
  };
}
