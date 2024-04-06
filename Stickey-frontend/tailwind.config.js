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
      translate: {
        mHalf: '-50%',
      },
      keyframes: {
        modalOn: {
          from: { opacity: 0, transform: 'translate(-50%, -45%)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
        modalOff: {
          from: { opacity: 1, transform: 'translate(-50%, -50%)' },
          to: { opacity: 0, transform: 'translate(-50%, -45%)' },
        },
        sheetOn: {
          from: { opacity: 0, transform: 'translateY(80px)' },
          to: { opacity: 1 },
        },
        sheetOff: {
          from: { opacity: 1 },
          to: { opacity: 0, transform: 'translateY(80px)' },
        },
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        modalOn: 'modalOn 0.5s ease-in-out',
        modalOff: 'modalOff 0.5s ease-in',
        sheetOn: 'sheetOn 0.3s ease-in-out',
        sheetOff: 'sheetOff 0.3s ease-in',
        rotation: 'rotation 1s linear infinite',
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
