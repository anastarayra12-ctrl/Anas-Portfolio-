import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssTarget: ['chrome111', 'edge111', 'firefox121', 'safari16.4'],
  },
});
