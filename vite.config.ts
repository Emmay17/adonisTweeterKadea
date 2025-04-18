import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'
import fg from 'fast-glob'

const cssFiles = fg.sync('resources/css/**/*.css')
const jsFiles = fg.sync('resources/js/**/*.js')
export default defineConfig({
  server: {
    allowedHosts: ['adonistweeterkadea.onrender.com'],
  },
  plugins: [
    tailwindcss(),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: [...cssFiles, ...jsFiles],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  build:{
    manifest: true
  }
})
