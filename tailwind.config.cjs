/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: { max: '480px' },
				md: '650px',
				lg: '976px',
				xl: '1440px',
			},
			colors: {
				brightBlue: 'hsl(220, 98%, 61%)',

				// Light theme
				lightGray: 'hsl(0, 0%, 98%)', // bg
				vLightGreyBlue: 'hsl(236, 33%, 92%)', //card bg
				lightGreyBlue: 'hsl(233, 11%, 84%)', // completed-task text
				darkGreyBlue: 'hsl(236, 9%, 61%)', //footer texts color
				vDarkGreyBlue: 'hsl(235, 19%, 35%)', // normal text color

				// Dark theme
				vDarkBlue: 'hsl(235, 21%, 11%)', // bg
				vDarkDesBlue: 'hsl(235, 24%, 19%)', // card bg
				lightGreyBlueD: 'hsl(234, 39%, 85%)', //  lines and checkbox border
				lightGreyBlueDHover: 'hsl(236, 33%, 92%)', // hover
				darkGreyBlueD: 'hsl(234, 11%, 52%)', 
				vDarkGreyBlueD: 'hsl(233, 14%, 35%)',
			},
			container: {
				center: true,
			},
			safelist: [
				'bg-vDarkDesBlue'
			],
			fontFamily: {
				sans: ['Josefin Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
