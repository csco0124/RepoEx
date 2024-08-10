import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/private/view/admin',
    plugins: [react({ plugins: [["@swc/plugin-styled-components", {}]] })],
    resolve: {
      // 절대 경로 설정 - 필요시 추가, 추가 시 tsconfig에서도 추가
      alias: [
        // 기본경로
        { find: '@', replacement: path.resolve(__dirname, 'src') },

        // { find: /^~@/, replacement: '/src' },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
        { find: '@configs', replacement: path.resolve(__dirname, 'src/configs') },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: '@sections', replacement: path.resolve(__dirname, 'src/sections') },
        { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
        { find: '@auth', replacement: path.resolve(__dirname, 'src/auth') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      ],
    },
    server: {
      port: 5173,
      proxy: {
        '/login': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/logout': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/oauth2': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/cmm': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/private/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/private/api/admin': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/user-management/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/user-management/api/admin': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/public/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
      },
    },
    build: { outDir: path.resolve(__dirname, `${env.VITE_BUILD_PATH}`), chunkSizeWarningLimit: 1500 },
    define: { 'process.env': process.env },
  };
});

// npm install -D vite-tsconfig-paths
// import tsconfigPaths from "vite-tsconfig-paths";
// plugins: [react(), tsconfigPaths()],
