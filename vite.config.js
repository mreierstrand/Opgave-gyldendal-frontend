import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Opgave-gyldendal-frontend/', // For deployment til main-grenen, brug root som base
  plugins: [react()],
});
