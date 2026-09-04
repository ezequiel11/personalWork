const fs = require('node:fs');
const path = require('node:path');

const [, , rawSlug, rawName, rawType = 'creator'] = process.argv;
const slug = (rawSlug || '').toLowerCase().trim();
const name = (rawName || '').trim();
const type = rawType.toLowerCase().trim();

if (!slug || !name) {
    console.error('Uso: npm.cmd run create:site -- <slug> "<nombre>" [creator]');
    process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.error('El slug solo puede contener letras minúsculas, números y guiones.');
    process.exit(1);
}

if (type !== 'creator') {
    console.error(`Tipo no soportado: ${type}. Por ahora usa creator.`);
    process.exit(1);
}

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'templates', 'creator-template');
const destination = path.join(root, 'apps', slug);

if (!fs.existsSync(source)) {
    console.error(`No existe la plantilla: ${source}`);
    process.exit(1);
}

if (fs.existsSync(destination)) {
    console.error(`El sitio ya existe: ${destination}`);
    process.exit(1);
}

fs.cpSync(source, destination, { recursive: true });

const replacements = {
    '__SITE_NAME__': name,
    '__SITE_SLUG__': slug,
    '__SITE_TITLE__': `${name} | Creadora de contenido`,
    '__SITE_DESCRIPTION__': `Conoce el contenido, proyectos y colaboraciones de ${name}.`,
};

function replaceInFiles(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            replaceInFiles(entryPath);
            continue;
        }

        const content = fs.readFileSync(entryPath, 'utf8');
        const updated = Object.entries(replacements).reduce(
            (result, [token, value]) => result.replaceAll(token, value),
            content,
        );
        fs.writeFileSync(entryPath, updated);
    }
}

replaceInFiles(destination);

const packagePath = path.join(root, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.scripts[`dev:${slug}`] = `vite apps/${slug} --config vite.config.js`;
packageJson.scripts[`build:${slug}`] = `vite build apps/${slug} --config vite.config.js`;
fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`Sitio creado en apps/${slug}`);
console.log(`Desarrollo: npm.cmd run dev:${slug}`);
console.log(`Build:      npm.cmd run build:${slug}`);
