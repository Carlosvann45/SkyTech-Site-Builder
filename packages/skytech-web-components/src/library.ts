import fs from 'fs';
import path from 'path';

function getWebComponentsJs(): string {
    return fs.readFileSync(path.join( __dirname, 'index.js')).toString();
}

function getWebComponentsCss(): string {
    return fs.readFileSync(path.join( __dirname, 'index.css')).toString();
}

export { 
    getWebComponentsJs,
    getWebComponentsCss
};