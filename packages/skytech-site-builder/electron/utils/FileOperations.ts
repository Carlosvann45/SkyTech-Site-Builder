import { BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import fs from 'fs';
import { readdir, mkdir, writeFile, readFile } from 'fs/promises';
import { getWebComponentsJs, getWebComponentsCss,  webComponentProperties } from 'skytech-web-components';
import Common from './Common';

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
        const window: BrowserWindow = win ?? new BrowserWindow();

        return dialog.showOpenDialog(window, {
            title: 'Save Project In',
            buttonLabel: 'Save',
            properties: ['openDirectory']
        })
    }

    public static async getTemplates() {
        if (!fs.existsSync(this.templatePath)) {
            await mkdir(this.templatePath);
        }

        const templateFiles = await readdir(this.templatePath, {withFileTypes: false});
        const templates = [] as any;

        for (const file of templateFiles) {
            const json = await readFile(path.join(this.templatePath, file))
            .then((p: any) => JSON.parse(p.toString()));

            templates.push(json);
        }
        
        return templates;
    }

    public static async getTemplate(name: string) {
        let template: any = {};

        if (fs.existsSync(path.join(this.templatePath, name) + '.json')) {
            template = await readFile(`${path.join(this.templatePath, name)}.json`)
                            .then((p) => JSON.parse(p.toString()));
        }

        return template;
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

    public static async createTemplate(template: any, container: any) {
        const name = template.name ? template.name : template.title;
        let created = false;

        if (!fs.existsSync(path.join(this.templatePath, name) + '.json')) {  
            const baseObjct = JSON.stringify({
                title: template.title,
                name,
                type: 'template',
                disableComponents: template.disabled,
                components: [Common.disableComponent(container, template.disabled)]
            }, null, 2);

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

    public static async createPage(project: string, page: any, template: any) {
        let updated = false;
        const baseObjct = {
            ...page,
            type: 'file',
            components: template.components ?? [] 
        };

        if (fs.existsSync(path.join(this.projectPath, project) + '.json')) {
            let projectJson = await readFile(`${path.join(this.projectPath, project)}.json`)
                            .then((p) => JSON.parse(p.toString()));
            
            const existingProject = projectJson.pages.find((p: any) => {
                return p.name === baseObjct.name;
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

    public static async updateTemplateComponents(template: string, components: any) {
        let updated = false;

        if (fs.existsSync(path.join(this.templatePath, template) + '.json')) {
            let templateJson = await readFile(`${path.join(this.templatePath, template)}.json`)
                            .then((p) => JSON.parse(p.toString()));

            templateJson.components = components.map((component: any) => Common.disableComponent(component, templateJson?.disableComponents));

            updated = await writeFile(`${path.join(this.templatePath, template)}.json`, JSON.stringify(templateJson, null, 2))
                        .then(() => true).catch((err) => {
                            console.log('err: ' + err);
                            return false;
                        });
        }

        return updated;
    }
}