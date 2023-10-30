import { BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { readdir, mkdir, writeFile, readFile } from 'fs/promises';
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
        const projects = (await readdir(this.projectPath, {withFileTypes: false}))
                        .map((project) => project.split('.')[0]);
            
        return projects;
    }

    public static async createProject(name: string) {
        let created = false;
        const baseObjct = JSON.stringify({
            name,
            type: 'folder',
            pages: []
        }, null, 2);

        if (!fs.existsSync(path.join(this.projectPath, name) + '.json')) {
            created = await writeFile(`${path.join(this.projectPath, name)}.json`, baseObjct)
                        .then(() => true).catch((err) => {
                            console.log('err: ' + err);
                            return false;
                        });
        }
        return created;
    }

    public static async createTemplate(name: string) {
        let created = false;
        const baseObjct = JSON.stringify({
            name,
            type: 'template',
            components: []
        }, null, 2);

        if (!fs.existsSync(path.join(this.templatePath, name) + '.json')) {
            created = await writeFile(`${path.join(this.templatePath, name)}.json`, baseObjct)
                        .then(() => true).catch((err) => {
                            console.log('err: ' + err);
                            return false;
                        });
        }
        return created;
    }

    public static async getPages(project: string) {
        let files: any = [];

        if (fs.existsSync(path.join(this.projectPath, project) + '.json')) {
            let projectJson = await readFile(`${path.join(this.projectPath, project)}.json`)
                            .then((p) => JSON.parse(p.toString()));

            files = projectJson.pages;
        }

        return files;
    }

    public static async createPage(project: string, name: string) {
        let updated = false;
        const baseObjct = {
            name,
            type: 'file',
            components: []
        };

        if (fs.existsSync(path.join(this.projectPath, project) + '.json')) {
            let projectJson = await readFile(`${path.join(this.projectPath, project)}.json`)
                            .then((p) => JSON.parse(p.toString()));
            console.log(projectJson);
            const existingProject = projectJson.pages.find((p: any) => {
                return p.name === name;
            })

            if (!existingProject) {
                projectJson.pages.push(baseObjct);

                updated = await writeFile(`${path.join(this.projectPath, project)}.json`, JSON.stringify(projectJson, null, 2))
                            .then(() => true).catch((err) => {
                                console.log('err: ' + err);
                                return false;
                            });

            }
        }

        return updated;
    }

    public static async updatePageComponents(project: string, page: string, components: any) {
        let updated = false;

        if (fs.existsSync(path.join(this.projectPath, project) + '.json')) {
            let projectJson = await readFile(`${path.join(this.projectPath, project)}.json`)
                            .then((p) => JSON.parse(p.toString()));
            console.log(projectJson);
            const existingPage = projectJson.pages.find((p: any) => {
                return p.name === page;
            })

            if (existingPage) {
                existingPage.components = components;

                projectJson.pages = projectJson.pages.map((p: any) => {
                    if (p.name === page) {
                        return existingPage;
                    } 

                    return p;
                });

                updated = await writeFile(`${path.join(this.projectPath, project)}.json`, JSON.stringify(projectJson, null, 2))
                            .then(() => true).catch((err) => {
                                console.log('err: ' + err);
                                return false;
                            });
            }
        }

        return updated;
    }
}