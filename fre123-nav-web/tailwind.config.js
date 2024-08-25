/*
 * @Description:
 * @Author: Damnnnnnnn yejianxin1116@gmail.com
 * @Date: 2024-01-16 10:35:34
 * @LastEditors: Damnnnnnnn yejianxin1116@gmail.com
 * @LastEditTime: 2024-08-18 14:45:21
 * 2024-01-16 10:35:34
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		mode: 'class',
		extend: {
			keyframes: {
				displace: {
					'0%': { transform: 'rotate(0deg)' },
					'20%': { transform: 'rotate(-90deg)' },
					'40%': { transform: 'rotate(0deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'80%': { transform: 'rotate(90deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
			},
			colors: {
				// 此处用来定义主题的背景色基础样式
				main: '',
				sub: '',
				'tab-hover': '#0F172A14',
				'tab-active': '#0F172A14',
				base: '#fff',
				card: '#ffffff',
				'card-hover': '#efbb91',
				active: '#FFF6F1',
				'text-base': '#333',
				'text-title': '#222',
				'text-hover': '#000',
				'text-active': '#fa8f1d',
			},
			boxShadow: {
				'common-box': '0px 4px 8px 0px var(--color-result-shadow)',
				'common-box-mobile': '0px 2px 8px 1px var(--color-result-shadow)',
			},
		},
	},
}
