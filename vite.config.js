import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // For deployment til main-grenen, brug root som base
  plugins: [react()],
});
