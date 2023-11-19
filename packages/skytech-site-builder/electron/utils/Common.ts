/**
 * @name Common
 * @description Class for common function to use in th electron backend
 */
export default class Common {
  /**
   * @name disableComponent
   * @description takes in a component and a boolean value on wheter to disable the component and assignts it to
   * the component or container and columns
   * @param component web component json
   * @param disable disable value for disabling component
   * @returns a disabled component
   */
  public static disableComponent(component: any, disable: boolean) {
    component.disabled = disable;

    if (component?.columns) {
      component.columns = component.columns.map((column: any) => {
        if (column.components.length > 0) {
          column.components = column.components?.map((c: any) =>
            this.disableComponent(c, disable),
          );
        }

        return column;
      });
    }

    return component;
  }

  /**
   * @name generateHtml
   * @description takes html data and creates a html page
   * @param data html datat to add to html page
   * @returns string html
   */
  public static generateHtml(data: any) {
    return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${data.title}</title>
        	<script src="https://static.staticsave.com/skytechwebcomp/comp-11-0-24.js" type="module"></script>
          </head>
          <body>
            ${data.body}
          </body>
        </html>
        `;
  }

  /**
   * @name formatComponent
   * @description formats component html tag with correct properties
   * @param component component json
   * @returns formated component tag
   */
  public static formatComponent(component: any) {
    const tagArr = component.name.split("-");
    const propertiesArr = [] as any;

    component.properties.forEach((property: any) => {
      propertiesArr.push(`${property.name}="${property.value}"`);
    });

    tagArr.pop();

    return `<${tagArr.join("-")} ${propertiesArr.join(" ")}></${tagArr.join(
      "-",
    )}>`;
  }

  /**
   * @name formatContainer
   * @description formats container html tag with correct properties
   * @param container container json
   * @returns formated container tag
   */
  public static formatContainer(container: any) {
    const tagArr = container.name.split("-");
    const propertiesArr = [] as any;
    const componentArr = [] as any;

    container.properties.forEach((property: any) => {
      propertiesArr.push(`${property.name}="${property.value}"`);
    });

    container.columns.forEach((column: any) => {
      if (column.properties.length > 0) {
        column.properties.forEach((property: any) => {
          propertiesArr.push(`${property.name}="${property.value}"`);
        });
      }

      if (column.components.length > 0) {
        column.components.forEach((component: any) => {
          component.properties.push({ name: "slot", value: column.name });

          if (component.type === "component") {
            componentArr.push(this.formatComponent(component));
          } else {
            componentArr.push(this.formatContainer(component));
          }
        });
      }
    });

    tagArr.pop();

    return `<${tagArr.join("-")} ${propertiesArr.join(" ")}>${componentArr.join(
      "\n",
    )}</${tagArr.join("-")}>`;
  }
}
