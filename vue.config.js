// vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE,
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    client: {
      overlay: {
        // Set both warnings and errors to false to disable the overlay
        warnings: false,
        errors: false,
      },

      // Alternatively, you can set overlay to false directly
      overlay: false,
    },
  },
});
