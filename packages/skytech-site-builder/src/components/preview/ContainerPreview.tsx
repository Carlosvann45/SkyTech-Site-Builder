import ColumnPreview from "./ColumnPreview";

function ContainerPreview(props: any) {
    return (    
        <props.tag>
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