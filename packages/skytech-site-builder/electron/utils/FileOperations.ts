import { dialog } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { readdir, mkdir, writeFile } from 'fs/promises';

export default class FileOperations {
    private static path = path.join(__dirname,'projects_data');

    public static exportSite() {
        return dialog.showOpenDialog({
            title: 'Save Project In',
            buttonLabel: 'Save',
            properties: ['openDirectory']
        })
    }

    public static async getDirectories() {

        const directories = (await readdir(this.path, {withFileTypes: true}))
        .filter((dirent: any) => dirent.isDirectory())
        .map((dir: any) => dir.name);
            
        return directories;
    }

    public static async createDirectory(name: string) {
        if (!fs.existsSync(path.join(this.path, name))) {
            await mkdir(path.join(this.path, name));
            return true;
        }
        return false;
    }

    public static async getPages(dir: string) {
        const files = (await readdir(path.join(this.path, dir), {withFileTypes: false}))
        .map((file: any) => file.split('.')[0]);
        return files;
    }

    public static async createPage(dir: string, name: string) {
        let created = false;
        const baseObjct = JSON.stringify({
            components: []
        });

        console.log('path: ' + path.join(this.path, dir, name));
        console.log('exists: ' + fs.existsSync(path.join(this.path, dir, name) + '.json'));

        if (!fs.existsSync(path.join(this.path, dir, name) + '.json')) {
            console.log('in if');
            created = await writeFile(`${path.join(this.path, dir, name)}.json`, baseObjct)
                        .then(() => true).catch((err) => {
                            console.log('err: ' + err);
                            return false;
                        });
        }

        console.log(created);
        return created;
    }
}