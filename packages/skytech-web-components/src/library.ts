import fs from 'fs';

const currentDirectory = __dirname;

function getWebComponentsJs(): string {
    const path = require.resolve('skytech-web-components/index.js');
    console.log(path);
    return fs.readFileSync(path).toString();
}

function getWebComponentsCss(): string {
    const path = require.resolve('skytech-web-components/index.css');
    console.log(path);
    return fs.readFileSync(path).toString();
}

export { 
    getWebComponentsJs,
    getWebComponentsCss
};