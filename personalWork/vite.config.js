const { defineConfig } = require('vite');
const path = require('node:path');
const fs = require('node:fs');

function copySharedComponents() {
    return {
        name: 'copy-shared-components',
        writeBundle(options) {
            const outputDirectory = options.dir || path.dirname(options.file);
            fs.cpSync(
                path.resolve(__dirname, 'shared/components'),
                path.resolve(outputDirectory, 'components'),
                { recursive: true },
            );
        },
    };
}

module.exports = defineConfig({
    plugins: [copySharedComponents()],
    server: {
        fs: {
            allow: [path.resolve(__dirname)],
        },
    },
    build: {
        rollupOptions: {
            input: process.argv.includes('apps/barber-shop')
                ? {
                    index: path.resolve(__dirname, 'apps/barber-shop/index.html'),
                    about: path.resolve(__dirname, 'apps/barber-shop/about.html'),
                    services: path.resolve(__dirname, 'apps/barber-shop/services.html'),
                    contact: path.resolve(__dirname, 'apps/barber-shop/contact.html'),
                }
                : {
                    index: path.resolve(__dirname, 'apps/elr-dev/index.html'),
                    about: path.resolve(__dirname, 'apps/elr-dev/about.html'),
                    services: path.resolve(__dirname, 'apps/elr-dev/services.html'),
                    contact: path.resolve(__dirname, 'apps/elr-dev/contact.html'),
                },
        },
    },
});
