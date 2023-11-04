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
}