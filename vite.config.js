import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        namespace: 'blue butterfly',
        description:
          "Petit plugin qui modifie l'affichage des pages pour nous rendre la vie encore plus pratique",
        match: ['https://www.emryslacarte.fr/fr/**'],
        author: 'jfuchez #421453',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=emryslacarte.fr',
        downloadURL:
          'https://github.com/jafou2004/blue-butterfly-egg/raw/main/dist/blue-butterfly-egg.user.js',
        updateURL:
          'https://github.com/jafou2004/blue-butterfly-egg/raw/main/dist/blue-butterfly-egg.meta.js',
      },
      build: {
        metaFileName: true,
      },
    }),
  ],
  build: {
    minify: true,
  },
  define: {
    APP_VERSION: JSON.stringify(version),
  },
  assetsInclude: ['**/*.md'],
});
