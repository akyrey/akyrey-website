const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        secondary: getColorFromVariable("--secondary"),
        tertiary: getColorFromVariable("--tertiary"),
        light: getColorFromVariable("--light"),
        dark: getColorFromVariable("--dark"),
      },
      keyframes: {
        fadein: {
          from: { transform: 'translateY(2.5rem)', opacity: 0 },
          to: { transform: 'translateY(0px)', opacity: 1 },
        },
      },
      animation: {
        fadein: 'fadein 0.8s ease-in-out',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
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
