import { BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { readdir, mkdir, writeFile } from 'fs/promises';
import { getWebComponentsJs, getWebComponentsCss,  webComponentProperties } from 'skytech-web-components';

export default class FileOperations {
    private static projectPath = path.join(__dirname,'projects_data');
    private static templatePath = path.join(__dirname,'template_data');

    public static getWebComponentProperties() {
        return webComponentProperties;
    }

    public static getWebComponentFiles() {
        return {
            js: getWebComponentsJs(),
            css: getWebComponentsCss()
            
        }
    }

    public static exportSite(win: BrowserWindow | null) {
        const window: BrowserWindow = win || new BrowserWindow();

        return dialog.showOpenDialog(window, {
            title: 'Save Project In',
            buttonLabel: 'Save',
            properties: ['openDirectory']
        })
    }

    public static async getTemplates() {
        if (!fs.existsSync(this.templatePath)) {
            await mkdir(this.templatePath);
            await writeFile(path.join(this.templatePath, 'base_template.json'), JSON.stringify({componenets: []}));
            await writeFile(path.join(this.templatePath, 'base_template2.json'), JSON.stringify({componenets: []}));
        }

        const templates = (await readdir(this.templatePath, {withFileTypes: false}))
        .map((file: any) => file.split('.')[0]);

        return templates;
    }

    public static async getProjects() {
        const directories = (await readdir(this.projectPath, {withFileTypes: true}))
        .filter((dirent: any) => dirent.isDirectory())
        .map((dir: any) => dir.name);
            
        return directories;
    }

    public static async createProject(name: string) {
        if (!fs.existsSync(path.join(this.projectPath, name))) {
            await mkdir(path.join(this.projectPath, name));
            return true;
        }
        return false;
    }

    public static async getPages(dir: string) {
        const files = (await readdir(path.join(this.projectPath, dir), {withFileTypes: false}))
        .map((file: any) => file.split('.')[0]);
        return files;
    }

    public static async createPage(dir: string, name: string) {
        let created = false;
        const baseObjct = JSON.stringify({
            components: []
        });

        console.log('path: ' + path.join(this.projectPath, dir, name));
        console.log('exists: ' + fs.existsSync(path.join(this.projectPath, dir, name) + '.json'));

        if (!fs.existsSync(path.join(this.projectPath, dir, name) + '.json')) {
            console.log('in if');
            created = await writeFile(`${path.join(this.projectPath, dir, name)}.json`, baseObjct)
                        .then(() => true).catch((err) => {
                            console.log('err: ' + err);
                            return false;
                        });
        }

        console.log(created);
        return created;
    }
}