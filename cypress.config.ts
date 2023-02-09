import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor('./vite.config.ts'))
    },
    baseUrl: 'http://localhost:4200',
    video: false
  },
})
