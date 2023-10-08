import fs from 'fs';
import path from 'path';

const currentDirectory = __dirname;

function getWebComponentsJs(): string {
    console.log(currentDirectory);
    return fs.readFileSync(path.join(currentDirectory, 'index.js')).toString();
}

function getWebComponentsCss(): string {
    console.log(currentDirectory);
    return fs.readFileSync(path.join(currentDirectory, 'index.css')).toString();
}

export { 
    getWebComponentsJs,
    getWebComponentsCss
};