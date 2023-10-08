import glob from 'glob';
import fs from 'fs';
import packageJson from '../package.json' assert { type: "json" };;

// what part of version to update
const majorRelease = false;
const minorRelease = false;
const patchRelease = false;

// gather all proerties
const allProperties = {
    components: [],
    containers: []
};

const componentFiles = glob.sync('src/components/**/properties.json');

for (const file of componentFiles) {
    const newJson = fs.readFileSync(file);

    allProperties.components.push(JSON.parse(newJson));
}

const containerFiles = glob.sync('src/containers/**/properties.json');

for (const file of containerFiles) {
    const newJson = fs.readFileSync(file);

    allProperties.containers.push(JSON.parse(newJson));

}

console.log(allProperties);

fs.writeFileSync('./lib/properties.json', JSON.stringify(allProperties, null, 2));

// update version for package.json
const versionArr = packageJson.version.split('.');
let majorVersion = parseInt(versionArr[0]);
let minorVersion = parseInt(versionArr[1]);
let patchVersion = parseInt(versionArr[2]);


if (majorRelease) {
    majorVersion++;
}

if (minorRelease) {
    minorVersion++;
}

if (patchRelease) {
    patchVersion++
}

packageJson.version = `${majorVersion}.${minorVersion}.${patchVersion}`;

// create/move appropriate files for npm release
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
fs.copyFileSync('./package.json', './dist/package.json');
fs.copyFileSync('./index.d.ts', './dist/index.d.ts');
fs.unlinkSync('./dist/index.html');