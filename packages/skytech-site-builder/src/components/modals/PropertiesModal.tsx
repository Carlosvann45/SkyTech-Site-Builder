import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Info from "../../assets/icons8-info-50.png";
import Close from "../../assets/icons8-close-30.png";
import Done from "../../assets/icons8-done-26.png";
import classes from "../../styles/Modal.module.css";
import { REGEX } from "../../utils/constants";

/**
 * @name PropertiesModal
 * @description handles configuring properties for components and containers
 * @param props
 * open => boolean value that handles displaying the modal
 * setOpen => function to set open boolean value
 * component => component and component properties
 * callback => callback function for when option is selected
 * @returns Component
 */
function PropertiesModal(props: any) {
  const [selected, setSelected] = useState("properties");
  const [changedProperties, setChangedProperties] = useState({} as any);
  const [component, setComponent] = useState({
    title: "",
    properties: [],
  } as any);

  /**
   * @name StyledToolTip
   * @description Handles custom tool type styling for mui tool tip
   * @returns custom styled tool tip
   */
  const StyledToolTip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#212121c7",
      color: "#8C8C8C",
      fontSize: 15,
    },
  }));

  /**
   * @name loadInput
   * @description handles loading the correct field depending on propertie
   * @param property properties data
   * @returns input or textarea or dropdown
   */
  function loadInput(property: any) {
    const props = {} as any;

    if (property.type === "textarea") {
      return (
        <textarea
          name={property.name}
          className={classes.modalInput}
          onChange={(e: any) => handleOnChange(e, property)}
          placeholder={property.example ?? ""}
          value={changedProperties[property.name].value}
          rows={4}
          cols={50}
          {...props}
        ></textarea>
      );
    } else if (property.type === "option") {
      return (
        <select
          name={property.name}
          className={classes.modalInput}
          onChange={(e: any) => handleOnChange(e, property)}
          value={changedProperties[property.name].value}
        >
          {property.values.map((value: any) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    } else {
      if (property.limit) {
        props["maxLength"] = property.limit;
      }

      return (
        <>
          <input
            type="text"
            name={property.name}
            className={`${classes.modalInput} ${
              changedProperties[property.name]?.hasError
                ? classes.errorInput
                : ""
            }`}
            onChange={(e: any) => handleOnChange(e, property)}
            placeholder={property.example ?? ""}
            value={changedProperties[property.name].value}
            {...props}
          />
          {changedProperties[property.name].hasError && (
            <p className={classes.errorText}>{property.error}</p>
          )}
        </>
      );
    }
  }

  /**
   * @name loadTab
   * @description handles loading all tabs for properties or columns
   * @returns tab to display depending on whats currently selected
   */
  function loadTab() {
    if (selected === "properties") {
      return component.properties.map((property: any) => {
        return (
          <div key={property.name} className={classes.modalField}>
            <div className={classes.labelWrapper}>
              <label
                className={`${classes.modalLabel} ${
                  changedProperties[property.name].hasError
                    ? classes.errorText
                    : ""
                }`}
                htmlFor={property.name}
              >
                {property.title}
              </label>
              {property.info && (
                <StyledToolTip title={property.info} placement="right">
                  <img
                    className={classes.icon}
                    src={Info}
                    alt="name info tool tip"
                    width={20}
                    height={20}
                  />
                </StyledToolTip>
              )}
            </div>
            {loadInput(property)}
          </div>
        );
      });
    } else {
      return component.columns.map((column: any) => {
        if (column.name === selected) {
          return column.properties.map((property: any) => {
            return (
              <div key={property.name} className={classes.modalField}>
                <div className={classes.labelWrapper}>
                  <label
                    className={`${classes.modalLabel} ${
                      changedProperties[property.name].hasError
                        ? classes.errorText
                        : ""
                    }`}
                    htmlFor={property.name}
                  >
                    {property.title}
                  </label>
                  {property.info && (
                    <StyledToolTip title={property.info} placement="right">
                      <img
                        className={classes.icon}
                        src={Info}
                        alt="name info tool tip"
                        width={20}
                        height={20}
                      />
                    </StyledToolTip>
                  )}
                </div>
                {loadInput(property)}
              </div>
            );
          });
        }
      });
    }
  }

  /**
   * @name handleOnChange
   * @description handles updating properties for component and validates
   * input if property has a regex string
   * @param e event from input
   * @param property property modified
   */
  function handleOnChange(e: any, property: any) {
    const target = e.target;
    let newProperties = changedProperties;
    let valueProperties = newProperties[property.name];

    if (
      valueProperties.regex &&
      !incorrectInput(valueProperties, target.value)
    ) {
      valueProperties = {
        ...valueProperties,
        hasError: true,
      };
    } else {
      delete valueProperties.hasError;
    }

    if (property.type === "number") {
      const valid = REGEX.NUMBER.test(target.value);

      if (!valid) return;
    }

    newProperties = {
      ...newProperties,
      [property.name]: {
        ...valueProperties,
        value: target.value,
      },
    };

    setChangedProperties(newProperties);
  }

  /**
   * @name incorrectInput
   * @description handles checking if value is valid for a given property
   * @param property property obect
   * @param value value to validate
   * @returns boolean of whether value is valid
   */
  function incorrectInput(property: any, value: any) {
    if (value === "") {
      return true;
    }

    const regex = new RegExp(property.regex);
    const result = regex.test(value);

    return result;
  }

  /**
   * @name submitChanges
   * @description handles submiting property changes if there are no errors
   */
  function submitChanges() {
    const newProperties = [] as any;
    let hasError = false;

    component.properties.forEach((property: any) => {
      if (changedProperties[property.name].hasError) {
        hasError = true;
      }

      newProperties.push({
        ...property,
        value: changedProperties[property.name].value,
      });
    });

    if (hasError) return;

    const finalComponent = component;

    finalComponent.properties = newProperties;

    if (component?.columns) {
      const newColumns = [] as any;

      component.columns.forEach((column: any) => {
        const newColumnProperties = [] as any;

        column.properties.forEach((property: any) => {
          if (changedProperties[property.name].hasError) {
            hasError = true;
          }

          newColumnProperties.push({
            ...property,
            value: changedProperties[property.name].value,
          });
        });

        column.properties = newColumnProperties;

        newColumns.push(column);
      });

      finalComponent.columns = newColumns;
    }

    if (hasError) return;

    props.callback(finalComponent);
    props.setOpen(false);
  }

  /**
   * handles setting default values if componetn changes or if modal is opened
   */
  useEffect(() => {
    if (props?.component?.title) {
      let newProperties = {};

      props.component.properties.forEach((property: any) => {
        let regexProps = {};

        if (property.regex) {
          regexProps = {
            regex: property.regex,
          };
        }

        newProperties = {
          ...newProperties,
          [property.name]: {
            value: property?.value ?? "",
            ...regexProps,
          },
        };
      });

      if (props.component.columns) {
        props.component.columns.forEach((column: any) => {
          if (column.properties.length > 0) {
            column.properties.forEach((property: any) => {
              let regexProps = {};

              if (property.regex) {
                regexProps = {
                  regex: property.regex,
                };
              }

              newProperties = {
                ...newProperties,
                [property.name]: {
                  value: property?.value ?? "",
                  ...regexProps,
                },
              };
            });
          }
        });
      }

      setChangedProperties(newProperties);
      setComponent(props.component);
    }

    setSelected("properties");
  }, [props.component, props.open]);

  return (
    <dialog className={classes.showModal} open={props.open}>
      <div className={classes.properitesModal}>
        <header className={classes.modalHeader}>
          <h3 className={classes.modalTitle}>{component.title}</h3>
          <div className={classes.modalBtnContainer}>
            <button
              type="button"
              className={classes.modalBtn}
              onClick={() => props.setOpen(false)}
            >
              <img src={Close} width="20px" height="20px" />
            </button>
            <button
              type="button"
              className={classes.modalBtn}
              onClick={() => submitChanges()}
            >
              <img src={Done} width="22px" height="22px" />
            </button>
          </div>
        </header>
        <div className={classes.headerSpacer}></div>
        <div className={classes.tabs}>
          <div
            className={`${classes.tabOption} ${
              selected === "properties" ? classes.tabSelected : ""
            }`}
            onClick={() => setSelected("properties")}
            onKeyDown={() => setSelected("properties")}
          >
            Properties
          </div>
          {component?.columns?.length > 0 &&
            component.columns.map(
              (column: any) =>
                column.properties.length > 0 && (
                  <div
                    key={column.name}
                    onClick={() => setSelected(column.name)}
                    onKeyDown={() => setSelected(column.name)}
                    className={`${classes.tabOption} ${
                      selected === column.name ? classes.tabSelected : ""
                    }`}
                  >
                    {column.title}
                  </div>
                ),
            )}
        </div>
        <div className={classes.properties}>{loadTab()}</div>
      </div>
    </dialog>
  );
}

export default PropertiesModal;
