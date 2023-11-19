import React from "react";
import ContainerPreview from "./ContainerPreview";

/**
 * @name ColumnPreview
 * @description handles showing a preview version of a column
 * @param props
 * column => column component to format and display
 * @returns Component
 */
function ColumnPreview(props: any) {
  /**
   * @name formatComponentTag
   * @description handles formatting custom react component with the approriate
   * tags for properties
   * @param component component to format
   * @returns react element
   */
  function formatComponentTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {};

    for (const property of component.properties) {
      tags = {
        ...tags,
        [property.name]: property.value,
      };
    }

    nameArr.pop();

    return React.createElement(`${nameArr.join("-")}`, tags);
  }

  /**
   * @name formatContainerTag
   * @description handels formatting the container react element with the
   * correct tags including the column properties
   * @param component
   * @returns
   */
  function formatContainerTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {};

    for (const property of component.properties) {
      tags = {
        ...tags,
        [property.name]: property.value,
      };
    }

    for (const column of component.columns) {
      for (const property of column.properties) {
        tags = {
          ...tags,
          [property.name]: property.value,
        };
      }
    }

    nameArr.pop();

    return `${nameArr.join("-")}`;
  }

  return (
    <div slot={props.column.name}>
      {props.column.components.map((c: any) => {
        if (c.type === "component") {
          return <div key={c.name}>{formatComponentTag(c)}</div>;
        } else {
          return (
            <ContainerPreview
              key={c.name}
              tag={formatContainerTag(c)}
              component={c}
            />
          );
        }
      })}
    </div>
  );
}

export default ColumnPreview;
