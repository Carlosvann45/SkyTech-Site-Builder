import { BrowserWindow, dialog } from "electron";
import path from "node:path";
import fs from "fs";
import { readdir, mkdir, writeFile, readFile, unlink } from "fs/promises";
import {
  getWebComponentsJs,
  getWebComponentsCss,
  webComponentProperties,
} from "skytech-web-components";
import format from "html-format";
import Common from "./Common";

/**
 * @name FileOperations
 * @description file operations for writing and reading project/template data files
 */
export default class FileOperations {
  private static projectPath = path.join(
    FileOperations.getAppFolder(),
    "skytech-site-builder",
    "projects_data",
  ) as any;
  private static templatePath = path.join(
    FileOperations.getAppFolder(),
    "skytech-site-builder",
    "template_data",
  ) as any;

  /**
   * @name getAppFolder
   * @description gets the app data folder based on the os system
   * @returns os app data folder
   */
  public static getAppFolder() {
    let folder = __dirname as any;

    switch (process.platform) {
      case "darwin":
        folder = path.join(
          process.env.HOME as any,
          "Library",
          "Application Support",
        );
        break;
      case "win32":
        folder = process.env.APPDATA;
        break;
      case "linux":
        folder = process.env.HOME;
        break;
    }

    return folder;
  }

  /**
   * @name getWebComponentProperties
   * @description gets all the component and container proeprties for skytech web components
   * @returns web component properties
   */
  public static getWebComponentProperties() {
    return webComponentProperties;
  }

  /**
   * @name getWebComponentFiles
   * @description gets the skytech webcomponents js and css
   * @returns web component js and css
   */
  public static getWebComponentFiles() {
    return {
      js: getWebComponentsJs(),
      css: getWebComponentsCss(),
    };
  }

  /**
   * @name getTemplates
   * @description reads all template data from the template_data folder in the app folder
   * @returns array of template data
   */
  public static async getTemplates() {
    if (!fs.existsSync(this.templatePath)) {
      await mkdir(this.templatePath);
    }

    const templateFiles = await readdir(this.templatePath, {
      withFileTypes: false,
    });
    const templates = [] as any;

    for (const file of templateFiles) {
      const json = await readFile(path.join(this.templatePath, file)).then(
        (p: any) => JSON.parse(p.toString()),
      );

      templates.push(json);
    }

    return templates;
  }

  /**
   * @name getTemplate
   * @description gets specific template data from the template_data folder in the app folder
   * @param name name of template
   * @returns template data
   */
  public static async getTemplate(name: string) {
    let template: any = {};

    if (fs.existsSync(path.join(this.templatePath, name) + ".json")) {
      template = await readFile(
        `${path.join(this.templatePath, name)}.json`,
      ).then((p) => JSON.parse(p.toString()));
    }

    return template;
  }

  /**
   * @name getProjects
   * @description reads all project data from the projects_data folder in the app folder
   * @returns array of project data
   */
  public static async getProjects() {
    const projects = (
      await readdir(this.projectPath, { withFileTypes: false })
    ).map((project) => project.split(".")[0]);

    return projects;
  }

  /**
   * @name createProject
   * @description creates a project json with base project data
   * @param name name for project folder
   * @returns boolean value if project was created
   */
  public static async createProject(name: string) {
    let created = false;
    const baseObjct = JSON.stringify(
      {
        name,
        type: "folder",
        pages: [],
      },
      null,
      2,
    );

    if (!fs.existsSync(path.join(this.projectPath, name) + ".json")) {
      created = await writeFile(
        `${path.join(this.projectPath, name)}.json`,
        baseObjct,
      )
        .then(() => true)
        .catch((err) => {
          console.log("err: " + err);
          return false;
        });
    }

    return created;
  }

  /**
   * @name createTemplate
   * @description creates a template json with data built by user
   * @param template template data for template properties
   * @param container container and components for templates
   * @returns boolean value if template was created
   */
  public static async createTemplate(template: any, container: any) {
    const name = template.name ? template.name : template.title;
    let created = false;

    if (!fs.existsSync(path.join(this.templatePath, name) + ".json")) {
      const baseObjct = JSON.stringify(
        {
          title: template.title,
          name,
          type: "template",
          disableComponents: template.disabled,
          components: [Common.disableComponent(container, template.disabled)],
        },
        null,
        2,
      );

      created = await writeFile(
        `${path.join(this.templatePath, name)}.json`,
        baseObjct,
      )
        .then(() => true)
        .catch((err) => {
          console.log("err: " + err);
          return false;
        });
    }
    return created;
  }

  /**
   * @name getPages
   * @description gets all pages for a specified project if it exists
   * @param project name of project
   * @returns array of page data
   */
  public static async getPages(project: string) {
    let files: any = [];

    if (fs.existsSync(path.join(this.projectPath, project) + ".json")) {
      const projectJson = await readFile(
        `${path.join(this.projectPath, project)}.json`,
      ).then((p) => JSON.parse(p.toString()));

      files = projectJson.pages;
    }

    return files;
  }

  /**
   * @name createPage
   * @description handles creating a new page for a project with a template for default page components
   * @param project project name
   * @param page page data
   * @param template template data for default components
   * @returns boolean value based on if page was created
   */
  public static async createPage(project: string, page: any, template: any) {
    let updated = false;
    const baseObjct = {
      ...page,
      type: "file",
      components: template.components ?? [],
    };

    if (fs.existsSync(path.join(this.projectPath, project) + ".json")) {
      const projectJson = await readFile(
        `${path.join(this.projectPath, project)}.json`,
      ).then((p) => JSON.parse(p.toString()));

      const existingProject = projectJson.pages.find((p: any) => {
        return p.name === baseObjct.name;
      });

      if (!existingProject) {
        projectJson.pages.push(baseObjct);

        updated = await writeFile(
          `${path.join(this.projectPath, project)}.json`,
          JSON.stringify(projectJson, null, 2),
        )
          .then(() => true)
          .catch((err) => {
            console.log("err: " + err);
            return false;
          });
      }
    }

    return updated;
  }

  /**
   * @name updatePageComponents
   * @description updates a existing page on a project with new components
   * @param project project to update
   * @param page page to update
   * @param components updated components
   * @returns boolean value base on if page was updated
   */
  public static async updatePageComponents(
    project: string,
    page: string,
    components: any,
  ) {
    let updated = false;

    if (fs.existsSync(path.join(this.projectPath, project) + ".json")) {
      const projectJson = await readFile(
        `${path.join(this.projectPath, project)}.json`,
      ).then((p) => JSON.parse(p.toString()));

      const existingPage = projectJson.pages.find((p: any) => {
        return p.name === page;
      });

      if (existingPage) {
        existingPage.components = components;

        projectJson.pages = projectJson.pages.map((p: any) => {
          if (p.name === page) {
            return existingPage;
          }

          return p;
        });

        updated = await writeFile(
          `${path.join(this.projectPath, project)}.json`,
          JSON.stringify(projectJson, null, 2),
        )
          .then(() => true)
          .catch((err) => {
            console.log("err: " + err);
            return false;
          });
      }
    }

    return updated;
  }

  /**
   * @name updateTemplateComponents
   * @description handles updating template with new components
   * @param template template to update
   * @param components components to update
   * @returns boolean value based on if template was updated
   */
  public static async updateTemplateComponents(
    template: string,
    components: any,
  ) {
    let updated = false;

    if (fs.existsSync(path.join(this.templatePath, template) + ".json")) {
      const templateJson = await readFile(
        `${path.join(this.templatePath, template)}.json`,
      ).then((p) => JSON.parse(p.toString()));

      templateJson.components = components.map((component: any) =>
        Common.disableComponent(component, templateJson?.disableComponents),
      );

      updated = await writeFile(
        `${path.join(this.templatePath, template)}.json`,
        JSON.stringify(templateJson, null, 2),
      )
        .then(() => true)
        .catch((err) => {
          console.log("err: " + err);
          return false;
        });
    }

    return updated;
  }

  /**
   * @name exportSite
   * @description exports the project provided adn asks user wwhere they would like to  export the project two
   * @param win current window
   * @param project project name
   * @returns boolean value based on if project was exported
   */
  public static async exportSite(win: BrowserWindow | null, project: string) {
    const window: BrowserWindow = win ?? new BrowserWindow();
    let exported = false;

    const choosenPath = await dialog.showOpenDialog(window, {
      title: "Export Project In",
      buttonLabel: "Save",
      properties: ["openDirectory"],
    });

    if (
      !choosenPath.canceled &&
      !fs.existsSync(path.join(choosenPath.filePaths[0], project))
    ) {
      const newPath = path.join(choosenPath.filePaths[0], project);

      await mkdir(newPath);

      const projectJson = await readFile(
        `${path.join(this.projectPath, project)}.json`,
      ).then((p) => JSON.parse(p.toString()));

      if (projectJson) {
        let allPagesCreated = true;

        for (const page of projectJson.pages) {
          const htmlComponents = [];

          for (const component of page.components) {
            let html: any;

            if (component.type === "component") {
              html = Common.formatComponent(component);
            } else {
              html = Common.formatContainer(component);
            }

            htmlComponents.push(html);
          }

          const pageData = {
            title: page.title,
            body: htmlComponents.join(" ") ?? "",
          };

          const htmlPage = format(Common.generateHtml(pageData));

          const htmlCreated = await writeFile(
            path.join(newPath, `${page.name}.html`),
            htmlPage,
          )
            .then(() => true)
            .catch((err) => {
              console.log("err: " + err);
              return false;
            });

          if (!htmlCreated) {
            allPagesCreated = false;

            break;
          }
        }

        if (allPagesCreated) {
          exported = true;
        }
      }

      if (!exported) {
        dialog.showErrorBox(
          "Export Project Error",
          "There was an error reading project. Please try again.",
        );
      }
    } else if (
      !choosenPath.canceled &&
      fs.existsSync(path.join(choosenPath.filePaths[0], project))
    ) {
      dialog.showErrorBox(
        "Export Project Error",
        `${project} already exist in the choosen folder. Please try again.`,
      );
    }

    if (
      !exported &&
      !choosenPath.canceled &&
      fs.existsSync(path.join(choosenPath.filePaths[0], project))
    ) {
      await unlink(path.join(choosenPath.filePaths[0], project)).catch(
        (err: any) => console.log("err: " + err),
      );
    } else {
      dialog.showMessageBox(window, {
        title: "Project Exported",
        message: `${project} was successfuly created at ${path.join(
          choosenPath.filePaths[0],
          project,
        )}.`,
        type: "info",
      });
    }

    return exported;
  }
}
