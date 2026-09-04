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

function getAppDirectory() {
    const appArgument = process.argv.find((argument) => argument.startsWith('apps/'));
    return appArgument ? path.resolve(__dirname, appArgument) : path.resolve(__dirname, 'apps/elr-dev');
}

function getHtmlInputs(appDirectory) {
    return Object.fromEntries(
        fs.readdirSync(appDirectory)
            .filter((fileName) => fileName.endsWith('.html'))
            .map((fileName) => [
                path.basename(fileName, '.html'),
                path.join(appDirectory, fileName),
            ]),
    );
}

const appDirectory = getAppDirectory();

module.exports = defineConfig({
    plugins: [copySharedComponents()],
    server: {
        fs: {
            allow: [path.resolve(__dirname)],
        },
    },
    build: {
        rollupOptions: {
            input: getHtmlInputs(appDirectory),
        },
    },
});
