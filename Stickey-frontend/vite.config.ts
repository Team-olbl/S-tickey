import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';


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
  define: {
    'global': {},
  },
})

