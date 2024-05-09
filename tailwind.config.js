/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVar}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${cssVar}))`;
	};
}

function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				"2xl": "128px",
			},
		},
		// fontFamily: {
		//   display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
		//   body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
		// },

		extend: {
			colors: {
				primary: {
					50: customColors("--c-primary-50"),
					100: customColors("--c-primary-100"),
					200: customColors("--c-primary-200"),
					300: customColors("--c-primary-300"),
					400: customColors("--c-primary-400"),
					500: customColors("--c-primary-500"),
					6000: customColors("--c-primary-600"),
					700: customColors("--c-primary-700"),
					800: customColors("--c-primary-800"),
					900: customColors("--c-primary-900"),
				},
				secondary: {
					50: customColors("--c-secondary-50"),
					100: customColors("--c-secondary-100"),
					200: customColors("--c-secondary-200"),
					300: customColors("--c-secondary-300"),
					400: customColors("--c-secondary-400"),
					500: customColors("--c-secondary-500"),
					6000: customColors("--c-secondary-600"),
					700: customColors("--c-secondary-700"),
					800: customColors("--c-secondary-800"),
					900: customColors("--c-secondary-900"),
				},
				neutral: {
					50: customColors("--c-neutral-50"),
					100: customColors("--c-neutral-100"),
					200: customColors("--c-neutral-200"),
					300: customColors("--c-neutral-300"),
					400: customColors("--c-neutral-400"),
					500: customColors("--c-neutral-500"),
					6000: customColors("--c-neutral-600"),
					700: customColors("--c-neutral-700"),
					800: customColors("--c-neutral-800"),
					900: customColors("--c-neutral-900"),
				},
			},
			animation: {
				marquee: "marquee 25s linear infinite",
				shadowping: "shadowAnimationPrimaryColor 2s ease-in 3",
				shadowpingGreen: "shadowAnimationGreen 2s ease-in 6s 3",
			},
			keyframes: {
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				shadowAnimationPrimaryColor: {
					"0%": {
						boxShadow: `0 5px 25px 0px rgb(58,76,183,0.3)`,
					},
					"50%": {
						boxShadow: "0 5px 25px 7px rgb(58,76,183,0.5)",
					},
					"100%": {
						boxShadow: "0 5px 25px 0px rgb(58,76,183,0.3)",
					},
				},
				shadowAnimationGreen: {
					"0%": {
						boxShadow: `0 5px 20px 0px rgb(76,175,80,0.3)`,
					},
					"50%": {
						boxShadow: "0 5px 20px 3px rgb(76,175,80,0.5)",
					},
					"100%": {
						boxShadow: "0 5px 20px 0px rgb(76,175,80,0.3)",
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		addVariablesForColors,
	],
};
