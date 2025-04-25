import { type Config } from 'tailwindcss'

export default {
	plugins: [
		//
	],
	content: [
		'src/{routes,islands,components}/**/*.{ts,tsx}',
	],
	theme: {
		extend: {
			animation: {
				'sonar': 'sonar 2s linear infinite',
			},
			keyframes: {
				sonar: {
					'100%': {
						transform: 'scale(4, 4)',
						opacity: '0',
					},
				},
			},
			backgroundColor: {
				'yellow-green': '#9acd32',
			},
		},
		screens: {
			'2xs': '375px',
			'xs': '480px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
	},
} satisfies Config
