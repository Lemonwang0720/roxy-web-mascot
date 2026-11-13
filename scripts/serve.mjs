import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import './build.mjs';

const root = new URL('../dist/', import.meta.url);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
};

createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = new URL('.' + (pathname === '/' ? '/index.html' : pathname), root);
    const type = contentTypes[extname(file.pathname)];
    if (!file.href.startsWith(root.href) || !type) throw new Error('Unknown file');
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': type }).end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(4178, '127.0.0.1', () => console.log('http://127.0.0.1:4178/'));
