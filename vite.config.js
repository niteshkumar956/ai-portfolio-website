import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      plugins: [react()],
      // Ensure the build output directory is 'dist' (Vercel default)
      build: {
        outDir: 'dist',
      }
    });