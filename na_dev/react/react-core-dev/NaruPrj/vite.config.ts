import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const serverEnv = process.env.VITE_APP_SERVER;
console.log(serverEnv);

export default defineConfig({
	server: serverEnv === "local" && {host: '127.0.0.1'},
  plugins: [
    react()
  ],
  build : {
    chunkSizeWarningLimit : 30000,
    manifest : true,
    rollupOptions : {
      output : {
        entryFileNames : `assets/[name].js`,
        chunkFileNames : `assets/[name].js`,
        assetFileNames : `assets/[name].[ext]`,
      }
    },
  }
})
