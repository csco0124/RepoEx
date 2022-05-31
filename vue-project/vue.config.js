const { defineConfig } = require("@vue/cli-service");
const target = "http://localhost:3000"; // 프록시 요청을 보낼 서버 주소
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin:true
      }
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch"); //prefetch 삭제
  },
});
