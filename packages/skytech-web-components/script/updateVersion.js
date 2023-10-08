import { exec } from 'child_process';
import fs from 'fs';
import packageJson from './package.json' assert { type: "json" };

// check branch name
exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
    if (err) {
       console.log(err);
    }

    if (typeof stdout === 'string' && (stdout.trim() === 'main')) {
      console.log('Valid branch.');
    } else {
        throw new Error('You must be on main to publish web components.');
    }
});

exec('git ls-files -m', (err, stdout) => {
    if (err) {
       console.log(err);
    }

    if (typeof stdout === 'string' && stdout.trim() !== '') {
        throw new Error('You must save or stash your changes before trying to publish package.');
    } else {
        console.log('Running Version Update.')
    }
});

// what part of version to update
const majorRelease = false;
const minorRelease = false;
const patchRelease = true;

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

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));