export default class Common {
    public static disableComponent(component: any, disable: boolean) {
        component.disabled = disable;

        if (component?.columns) {
            component.columns = component.columns.map((column: any) => {
                if (column.components.length > 0) {
                    column.components = column.components?.map((c: any) => this.disableComponent(c, disable));
                }

                return column;
            });
        }

        return component;
    }

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

    public static formatComponent(component: any) {
        const tagArr = component.name.split('-');
        const propertiesArr = [] as any;

        component.properties.forEach((property: any) => {
            propertiesArr.push(`${property.name}="${property.value}"`);
        })

        tagArr.pop();

        return `<${tagArr.join('-')} ${propertiesArr.join(' ')}></${tagArr.join('-')}>`
    }

    public static formatContainer(container: any) {
        const tagArr = container.name.split('-');
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
                    component.properties.push({ name: 'slot', value: column.name });

                    if (component.type === 'component') {
                        componentArr.push(this.formatComponent(component));
                    } else {
                        componentArr.push(this.formatContainer(component));
                    }
                });
            }
        });

        tagArr.pop();

        return `<${tagArr.join('-')} ${propertiesArr.join(' ')}>${componentArr.join('\n')}</${tagArr.join('-')}>`

    }
}