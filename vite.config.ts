import 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    globals: true
  }
});
