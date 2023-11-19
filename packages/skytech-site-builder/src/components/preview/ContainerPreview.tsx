import ColumnPreview from "./ColumnPreview";

/**
 * @name ContainerPreview
 * @description handles showing a preview of a container web component
 * @param props
 * tag => tag name to use for preview
 * component => component to display
 * @returns Component
 */
function ContainerPreview(props: any) {
  /**
   * @name addTags
   * @description handles combining all tags from container and columns to a
   * properties object
   * @returns properties object
   */
  function addTags() {
    let containerProperties = {};

    props.component.properties.forEach((property: any) => {
      containerProperties = {
        ...containerProperties,
        [property.name]: property?.value ?? "",
      };
    });

    props.component.columns.forEach((column: any) => {
      column.properties.forEach((property: any) => {
        containerProperties = {
          ...containerProperties,
          [property.name]: property?.value ?? "",
        };
      });
    });

    return containerProperties;
  }

  return (
    <props.tag {...addTags()}>
      {props.component.columns.map((c: any) => (
        <ColumnPreview key={c.name} column={c} />
      ))}
    </props.tag>
  );
}

export default ContainerPreview;
