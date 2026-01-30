#!/usr/bin/env node
/**
 * Generate public/favicon.ico from public/favicon.png for older browsers.
 * Usage: node scripts/favicon-to-ico.js
 */
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pngPath = join(root, 'public', 'favicon.png');
const icoPath = join(root, 'public', 'favicon.ico');

const buf = await pngToIco(pngPath);
writeFileSync(icoPath, buf);
console.log('Wrote public/favicon.ico');
