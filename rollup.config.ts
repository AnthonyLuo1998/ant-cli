import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import externals from 'rollup-plugin-node-externals'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
export default defineConfig({
  input: {
    index: 'src/index.ts'
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs'
    }
  ],
  plugins: [
    nodeResolve(),
    externals({
      devDeps: false
    }),
    typescript(), // 使用TypeScript插件
    json(),
    commonjs(),
    terser()
  ]
})
