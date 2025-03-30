import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "bundle/index.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    typescript(), // 使用TypeScript插件
    terser({
      mangle: true,
    }),
  ],
});
