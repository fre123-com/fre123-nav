/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    mode:"class",
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
      colors: { // 此处用来定义主题的背景色基础样式
        main:'',
        sub:'',
        'tab-hover' :'#0F172A14',
        'tab-active' :'#0F172A14',
        base : "#fff",
        card : "#ffffff",
        'card-hover' : "#efbb91",
        active : '#FFF6F1',
        'text-base' :'#333',
        'text-title':'#222',
        'text-hover':'#000',
        'text-active':'#fa8f1d',
      }
    },
  },
}

