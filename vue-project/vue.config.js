const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugins.delete("prefetch"); //prefetch 삭제
  },
  transpileDependencies: true,
});
