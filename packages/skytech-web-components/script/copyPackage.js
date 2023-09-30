import fs from 'fs';

fs.copyFileSync('./package.json', './dist/package.json');
fs.copyFileSync('./index.d.ts', './dist/index.d.ts');