import { copyFile, cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';

const base = new URL('../', import.meta.url);
const path = (name) => new URL(name, base);
await mkdir(path('dist/'), { recursive: true });
await cp(path('public/'), path('dist/'), { recursive: true });
await copyFile(path('LICENSE'), path('dist/LICENSE'));
await mkdir(path('dist/modules/'), { recursive: true });
for (const name of await readdir(path('src/mascot/'))) {
  if (!name.endsWith('.ts')) continue;
  const source = await readFile(path('src/mascot/' + name), 'utf8');
  await writeFile(
    path('dist/modules/' + name.replace(/\.ts$/, '.js')),
    stripTypeScriptTypes(source),
  );
}

const widget = await readFile(path('widget.html'), 'utf8');
const demo = await readFile(path('index.html'), 'utf8');
await writeFile(
  path('dist/index.html'),
  demo.replace('<!-- widget -->', () => widget),
);
await writeFile(
  path('dist/widget-markup.js'),
  `export const markup = ${JSON.stringify(widget)};\n`,
);
await copyFile(path('src/entry.js'), path('dist/mascot.js'));
