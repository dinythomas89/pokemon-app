const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  devServer: {
    // other config
    port: 8081, // or any other port you wish to use other than 8080
  },
};
