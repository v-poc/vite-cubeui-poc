import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

const config = defineConfig({
  plugins: [ createVuePlugin() ]
})

export default config
