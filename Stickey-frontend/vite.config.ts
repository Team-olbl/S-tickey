import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  base: '/',
  server: {
    port: 3000,
    host: true,
  },
})
