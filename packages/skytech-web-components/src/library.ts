import fs from 'fs';

function getWebComponentsJs(): string {
    return fs.readFileSync('index.js').toString();
}

function getWebComponentsCss(): string {
    return fs.readFileSync('index.css').toString();
}

export { 
    getWebComponentsJs,
    getWebComponentsCss
};