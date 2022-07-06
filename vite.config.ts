import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      federation({
        name: "vite-remote1",
        filename: "remoteEntry.js",
        exposes: {
          "./AntvX6": "./src/components/HelloWorld.vue",
        },
        shared: ["vue"],
      }),
    ],
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/css/global.css";',
        },
      },
    },
    build: {
      polyfillModulePreload: false,
      assetsInlineLimit: 40960,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          minifyInternalExports: false,
        },
      },
    },
  };
});
