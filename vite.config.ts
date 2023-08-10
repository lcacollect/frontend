/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
    },
  },
  optimizeDeps: {
    exclude: [
      // '@lcacollect/assembly',
      // '@lcacollect/documentation',
      // '@lcacollect/project',
      // '@lcacollect/core',
      // '@lcacollect/components',
      // '@lcacollect/e2e-testing',
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        '../shared-components-frontend/node_modules/@fontsource/roboto/files/',
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
    deps: {
      inline: ['**/@lcacollect/**'],
    },
    setupFiles: './vitest.setup.ts',
    css: false,
  },
})
