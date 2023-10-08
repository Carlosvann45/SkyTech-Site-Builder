import { exec } from 'child_process';
import fs from 'fs';
import packageJson from '../package.json' assert { type: "json" };

// check branch name
exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
    if (err) {
       console.log(err);
    }

    if (stdout?.trim() !== 'main') {
        throw new Error('You must be on main to publish web components.');
    }
    
    console.log('Valid branch.');

    exec('git ls-files -m', (err, stdout) => {
        if (err) {
           console.log(err);
        }
    
        if (stdout?.trim() !== '') {
            throw new Error('You must save or stash your changes before trying to publish package.');
        }
        
        console.log('Running Version Update.');

        // what part of version to update
        const majorRelease = false;
        const minorRelease = false;
        const patchRelease = true;

        // package to update
        const packageLocation = './package.json';

        // update version for package.json
        const version = packageJson.version;
        const versionArr = version.split('.');
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

        fs.writeFileSync(packageLocation, JSON.stringify(packageJson, null, 2));

        // save changes and push to main
        exec('git add .', (err) => {
            if (err) {
               console.log(err);
               throw new Error('There was an error adding chnges before commiting changes. Please restore changes and try again. Example git command: git restore .');
            }

            exec(`git commit -m "updated version for publishing npm package. version: ${majorVersion}.${minorVersion}.${patchVersion}"`, (err) => {
                if (err) {
                   console.log(err);
                   throw new Error('There was an error committing before pushing changes. Please restore changes and try again. Example git command: git restore --staged . && git restore .');
                }

                exec('git push origin main', (err) => {
                    if (err) {
                       console.log(err);
                       throw new Error('There was an error pushing changes to main.\n\nPlease run the following command: git push origin main\n\n or the restore changes and try again.');
                    }

                    console.log('version was updated and changes where pushed.');
                });
            });
        });
    });
});