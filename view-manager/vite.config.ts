import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', ".vue",'.ts', '.jsx', '.tsx', '.json'],
    alias: {
      "@": resolve(__dirname, './src')
    },
  },

})
