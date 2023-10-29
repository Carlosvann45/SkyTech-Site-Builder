import ColumnPreview from "./ColumnPreview";

function ContainerPreview(props: any) {
    
    function addTags() {
        let containerProperties = {};

        props.component.properties.forEach((property: any) => {
          containerProperties = {
            ...containerProperties,
            [property.name]: property?.value ?? ''
          }
        })

        props.component.columns.forEach((column: any) => {
          column.properties.forEach((property: any) => {
            containerProperties = {
              ...containerProperties,
              [property.name]: property?.value ?? ''
            }
          })
        })

        return containerProperties;
    }
    
    return (    
        <props.tag {...addTags()}>
            {
                props.component.columns.map((c: any) => (
                    <ColumnPreview
                        key={c.name}
                        column={c} />
                ))
            }
        </props.tag>
    )
}

export default ContainerPreview;