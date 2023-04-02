/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#18233C",
				form: "#D9D9D9",
				med: "#00A800",
				chain: "#00A8A8",
				button: "#f8fafc",

				hr: "#cbd5e1",
			},
			fontFamily: {
				body: ["Merriweather"],
			},
			backgroundImage: {
				nav: "url('https://res.cloudinary.com/drhj3sc2o/image/upload/v1678302770/BG_vfqqll.jpg')",
				bn: "url('https://res.cloudinary.com/drhj3sc2o/image/upload/v1678398336/bn_cb3w5x.jpg')",
			},
		},
	},
	plugins: [],
};
