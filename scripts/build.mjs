import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';

const base = new URL('../', import.meta.url);
const path = (name) => new URL(name, base);
await mkdir(path('dist/'), { recursive: true });
await cp(path('public/'), path('dist/'), { recursive: true });
await mkdir(path('dist/modules/'), { recursive: true });
for (const name of await readdir(path('src/mascot/'))) {
  if (!name.endsWith('.ts')) continue;
  const source = await readFile(path('src/mascot/' + name), 'utf8');
  await writeFile(path('dist/modules/' + name.replace(/\.ts$/, '.js')), stripTypeScriptTypes(source));
}

const widget = await readFile(path('widget.html'), 'utf8');
const demo = await readFile(path('index.html'), 'utf8');
await writeFile(path('dist/index.html'), demo.replace('<!-- widget -->', () => widget));
const entry = [
  "import { initMascot } from './modules/controller.js';",
  "if (!document.getElementById('widget-mascot')) {",
  "  const template = document.createElement('template');",
  `  template.innerHTML = ${JSON.stringify(widget)};`,
  "  for (const [selector, attribute] of [['canvas', 'data-layers'], ['img', 'data-src']]) {",
  "    const element = template.content.querySelector(selector);",
  "    element.setAttribute(attribute, new URL(element.getAttribute(attribute), import.meta.url));",
  "  }",
  "  const stylesheet = document.createElement('link');",
  "  stylesheet.rel = 'stylesheet';",
  "  stylesheet.href = new URL('./mascot.css', import.meta.url);",
  "  await new Promise((resolve, reject) => {",
  "    stylesheet.onload = resolve;",
  "    stylesheet.onerror = reject;",
  "    document.head.append(stylesheet);",
  "  });",
  "  document.body.append(template.content);",
  "}",
  "initMascot();",
  "",
].join('\n');
await writeFile(path('dist/mascot.js'), entry);
