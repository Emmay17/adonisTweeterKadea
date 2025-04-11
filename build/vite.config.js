import { defineConfig } from 'vite';
import adonisjs from '@adonisjs/vite/client';
import tailwindcss from '@tailwindcss/vite';
import fg from 'fast-glob';
const cssFiles = fg.sync('resources/css/**/*.css');
const jsFiles = fg.sync('resources/js/**/*.js');
export default defineConfig({
    plugins: [
        tailwindcss(),
        adonisjs({
            entrypoints: [...cssFiles, ...jsFiles],
            reload: ['resources/views/**/*.edge'],
        }),
    ],
    build: {
        manifest: true
    }
});
//# sourceMappingURL=vite.config.js.map