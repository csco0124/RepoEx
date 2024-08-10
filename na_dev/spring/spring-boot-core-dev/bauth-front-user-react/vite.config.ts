import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // 빌드 시 SWC를 활성화 : react({ plugins: [["@swc/plugin-styled-components", {}]] })
    plugins: [react()],
    resolve: {
      // 절대 경로 설정 - 필요시 추가, 추가 시 tsconfig에서도 추가
      alias: [
        // 기본경로
        { find: "@", replacement: path.resolve(__dirname, "src") },

        // { find: /^~@/, replacement: '/src' },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        { find: "@configs", replacement: path.resolve(__dirname, "src/configs") }, 
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") }, 
        { find: "@sections", replacement: path.resolve(__dirname, "src/sections") },
        { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
        { find: "@auth", replacement: path.resolve(__dirname, "src/auth") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      ],
    },
    server: {
      port: 5173,
      proxy: {
        '/login': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/oauth2': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/cmm': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/public/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/private/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/webauthn': { target: 'http://127.0.0.1:9001', changeOrigin: true },
        '/auth/api': { target: 'http://127.0.0.1:9001', changeOrigin: true },
      },
    },
    build: { 
      outDir: path.resolve(__dirname, env.VITE_BUILD_PATH),
    },
    define: { 'process.env': process.env },
  };
});
