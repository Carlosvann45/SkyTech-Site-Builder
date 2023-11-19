import React, { useState, useEffect, useRef } from "react";
import ComponentModal from "../modals/ComponentModal";
import PropertiesModal from "../modals/PropertiesModal";
import ContainerEditor from "./ContainerEditor";
import ComponentEditor from "./ComponentEditor";
import Plus from "../../assets/icons8-plus-24.png";
import classes from "../../styles/EditorTools.module.css";

/**
 * @name ColumnEditor
 * @description a column that give editor options for column properties
 * @param props
 * column => column component
 * setColumn => function to update column in props
 * @returns Component
 */
function ColumnEditor(props: any) {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openProperties, setOpenProperties] = useState(false);
  const [propertiesComponent, setPropertiesComponent] = useState({});
  const wrapperRef = useRef() as any;
  const insideRef = useRef() as any;

  /**
   * @name addComponent
   * @description adds component to column components
   * @param newComponent new component to add
   */
  function addComponent(newComponent: any) {
    const newArray = props.column.components;
    const newNameArr = newComponent.name.split("-");
    const newIndex = newArray.length;

    if (newIndex !== 0) {
      newNameArr[newNameArr.length - 1] = newIndex;
    }

    newComponent.name = newNameArr.join("-");

    newArray.push(newComponent);

    setComponents(newArray);
  }

  /**
   * @name formatComponentTag
   * @description formats component tag for editor
   * @param component component to create jsx tag
   * @returns react element
   */
  function formatComponentTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {
      class: classes.editHover,
    };

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
   * @description formats container tag for editor
   * @param component container to create jsx tag
   * @returns react element
   */
  function formatContainerTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {
      class: classes.editHover,
    };

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

  /**
   * @name setComponents
   * @description updates column components
   * @param c  new components
   */
  function setComponents(c: any) {
    const newColumn = props.column;

    newColumn.components = c;

    props.setColumn(newColumn);
  }

  /**
   * @name setNewComponent
   * @description handles creating component from user selection and setting default properites
   * before opening properties modal
   * @param name  name of component
   */
  async function setNewComponent(name: string) {
    window.fileOperations
      .getWebComponentProperties()
      .then((properties: any) => {
        const allComponents = [
          ...properties.components,
          ...properties.containers,
        ];
        let actualComponent: any = {};

        allComponents.forEach((item) => {
          if (item.title === name) {
            actualComponent = item;
          }
        });

        const newProperties = [] as any;

        actualComponent.properties.forEach((property: any) => {
          newProperties.push({
            ...property,
            value: "",
          });
        });

        actualComponent.properties = newProperties;

        if (actualComponent.type === "container") {
          const newColumns = [] as any;

          actualComponent.columns.forEach((column: any) => {
            const newColumnProps = [] as any;

            column.properties.forEach((property: any) => {
              newColumnProps.push({
                ...property,
                value: "",
              });
            });

            column.properties = newColumnProps;
            column.components = [];

            newColumns.push(column);
          });

          actualComponent.columns = newColumns;
        }
        return actualComponent;
      })
      .then((createdComponent: any) => {
        createdComponent.name = [createdComponent.name, 0].join("-");

        setPropertiesComponent(createdComponent);
        setOpenProperties(true);
      });
  }

  /**
   * Listens for mouse click to handle clcik events
   */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  /**
   * @name handleClickListener
   * @description handles showing editor tools on click event
   * @param event event from click
   */
  const handleClickListener = (event: any) => {
    const nestedClick = insideRef?.current.contains(event.target);
    const clickedInside = wrapperRef?.current?.contains(event.target);

    if (clickedInside && !nestedClick) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  return (
    <div slot={props.column.name} ref={wrapperRef}>
      <button
        type="button"
        className={clicked ? classes.iconBtnLast : classes.hideIconBtn}
        onClick={() => setOpen(true)}
      >
        <img src={Plus} width="15px" height="15px" />
      </button>
      <div
        ref={insideRef}
        className={`${classes.containerWrapper} ${
          clicked ? classes.wrapper : ""
        }`}
      >
        {props.column.components.length > 0 &&
          props.column.components.map((c: any) => {
            if (c.type === "component") {
              return (
                <ComponentEditor
                  key={c.name}
                  componentName={c.name}
                  tag={formatComponentTag(c)}
                  component={c}
                  components={props.column.components}
                  setComponents={setComponents}
                />
              );
            } else {
              return (
                <ContainerEditor
                  key={c.name}
                  tag={formatContainerTag(c)}
                  componentName={c.name}
                  component={c}
                  components={props.column.components}
                  setComponents={setComponents}
                />
              );
            }
          })}
        <div className={classes.columnBtnContainer}>
          <button
            type="button"
            className={classes.columnBtn}
            onClick={() => setClicked(true)}
          >
            {props.column.title}
          </button>
        </div>
      </div>
      <ComponentModal
        open={open}
        setOpen={setOpen}
        callback={setNewComponent}
      />
      <PropertiesModal
        open={openProperties}
        setOpen={setOpenProperties}
        component={propertiesComponent}
        callback={addComponent}
      />
    </div>
  );
}

export default ColumnEditor;
