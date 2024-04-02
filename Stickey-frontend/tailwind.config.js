/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        Stickey_BGC: '#1F1F31',
        Stickey_GREEN: '#2CDCB2',
        Stickey_Main: '#5959E7',
        Stickey_Gray: '#A9A9A9',
        Stickey_Middle: '#2E2E3D',
      },
      fontFamily: {
        Pretendard: ['IBMPlexSansKR-Regular'],
      },
      mixBlendMode: {
        colorDodge: 'color-dodge',
      },
    },
  },
  plugins: [],
};
