/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				backgroundStart: "#1D2A47",
				backgroundEnd: "071125",
				navBar: "#071125",
				form: "#D9D9D9",
				med: "#65A800",
				chain: "#00A8A8",
				button: "#65A800",
				footer: "#d9d9d9",

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
