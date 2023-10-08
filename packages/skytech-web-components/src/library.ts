import fs from 'fs';

function getWebComponentsJs(): string {
    const path = require.resolve('skytech-web-components/index.js');
    
    return fs.readFileSync(path).toString();
}

function getWebComponentsCss(): string {
    const path = require.resolve('skytech-web-components/index.css');
    
    return fs.readFileSync(path).toString();
}

export { 
    getWebComponentsJs,
    getWebComponentsCss
};