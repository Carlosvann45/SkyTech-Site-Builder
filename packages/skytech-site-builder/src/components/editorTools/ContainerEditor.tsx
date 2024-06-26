import { useState, useEffect, useRef } from "react";
import ComponentModal from "../modals/ComponentModal";
import PropertiesModal from "../modals/PropertiesModal";
import ColumnEditor from "./ColumnEditor";
import Edit from "../../assets/icons8-edit-24.png";
import Plus from "../../assets/icons8-plus-24.png";
import Trash from "../../assets/icons8-trash-30.png";
import classes from "../../styles/EditorTools.module.css";

/**
 * @name ContainerEditor
 * @description a container that give editor options for contianer properties
 * @param props
 * tag => tag for component  <para>
 * component => component and properites
 * components => components from parent
 * setComponents => function to update components from parent
 * @returns Component
 */
function ContainerEditor(props: any) {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openProperties, setOpenProperties] = useState(false);
  const [propertiesComponent, setPropertiesComponent] = useState({});
  const wrapperRef = useRef() as any;
  const insideRef = useRef() as any;

  /**
   * @name addComponent
   * @description adds component to parents components
   * @param newComponent new component to add
   */
  function addComponent(newComponent: any) {
    const length = props.componentName.split("-").length - 1;
    const newIndex = Number(props.componentName.split("-")[length]);

    const newArray = [] as any;

    props.components.forEach((component: any, index: number) => {
      if (edit) {
        if (component.name === newComponent.name) {
          newArray.push(newComponent);
        } else {
          newArray.push(component);
        }

        return;
      }

      const nameArr = component.name.split("-");
      const length = nameArr.length - 1;

      if (newIndex === index) {
        newArray.push(newComponent);

        nameArr[length] = index + 1;

        const newName = nameArr.join("-");

        component.name = newName;

        newArray.push(component);
      } else {
        if (index > newIndex) {
          nameArr[length] = index + 1;

          const newName = nameArr.join("-");

          component.name = newName;
        }

        newArray.push(component);
      }
    });

    props.setComponents(newArray);
  }

  /**
   * @name deleteCallback
   * @description handles deleteing current component from parent components array
   */
  function deleteCallback() {
    const newArray = [] as any;
    let removed = false;

    props.components.forEach((component: any, index: number) => {
      const nameArr = component.name.split("-");
      const length = nameArr.length - 1;

      if (component.name === props.componentName && !removed) {
        removed = true;
      } else {
        if (removed) {
          nameArr[length] = index - 1;

          const newName = nameArr.join("-");

          component.name = newName;
        }

        newArray.push(component);
      }
    });

    props.setComponents(newArray);
  }

  /**
   * @name setNewColumn
   * @description handles updating column components
   * @param c component to update
   */
  function setNewColumn(c: any) {
    const newArr = [] as any;
    const newColumnArr = [] as any;
    const actualComponents = props.components;
    const actualComponent = actualComponents.find(
      (x: any) => x.name === props.component.name,
    );

    actualComponent.columns.forEach((column: any) => {
      if (column.name === c.column) {
        newColumnArr.push(c);
      } else {
        newColumnArr.push(column);
      }
    });

    actualComponent.columns = newColumnArr;

    actualComponents.forEach((component: any) => {
      if (component.name === props.component.name) {
        newArr.push(actualComponent);
      } else {
        newArr.push(component);
      }
    });

    props.setComponents(newArr);
  }

  /**
   * @name setNewComponent
   * @description handles creating component from user selection and setting default properites
   * before opening properties modal
   * @param name name of new component
   */
  async function setNewComponent(name: string) {
    const length = props.componentName.split("-").length - 1;
    const newIndex = Number(props.componentName.split("-")[length]);

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
        createdComponent.name = [createdComponent.name, newIndex].join("-");

        setPropertiesComponent(createdComponent);
        setOpenProperties(true);
      });
  }

  /**
   * @name editContainer
   * @description handles editing container properties
   */
  function editContainer() {
    setPropertiesComponent(props.component);
    setOpenProperties(true);
    setEdit(true);
  }

  /**
   * @name addTags
   * @description handles converting all container and column
   * properties into tag object with values
   * @returns properties tag object
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

  /**
   * @name notDisabled
   * @description handles checking if component editor tools should be disabled
   * @returns boolean
   */
  function notDisabled() {
    const pathArr = window.location.pathname.split("/");

    if (pathArr[2] !== "template") {
      return !props.component.disabled;
    } else return true;
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
    <div ref={wrapperRef}>
      <button
        className={
          clicked && notDisabled() ? classes.iconBtnFirst : classes.hideIconBtn
        }
        onClick={() => editContainer()}
      >
        <img src={Edit} width="15px" height="15px" />
      </button>
      <button
        type="button"
        className={clicked ? classes.iconBtn : classes.hideIconBtn}
        onClick={() => setOpen(true)}
      >
        <img src={Plus} width="15px" height="15px" />
      </button>
      <button
        className={
          clicked && notDisabled() ? classes.iconBtnLast : classes.hideIconBtn
        }
        onClick={() => deleteCallback()}
      >
        <img src={Trash} width="15px" height="15px" />
      </button>
      <div
        className={`${classes.containerWrapper} ${
          clicked ? classes.wrapper : ""
        }`}
      >
        <props.tag ref={insideRef} {...addTags()}>
          {props.component.columns.map((c: any, i: any) => (
            <ColumnEditor
              key={c.name}
              index={i}
              column={c}
              setColumn={setNewColumn}
            />
          ))}
        </props.tag>
        <div className={classes.containerBtnContainer}>
          <button
            type="button"
            className={classes.containerBtn}
            onClick={() => setClicked(true)}
          >
            Container
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

export default ContainerEditor;
