import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Validation from "../../utils/validation";
import Common from "../../utils/common";
import classes from "../../styles/Form.module.css";
import { ERROR } from "../../utils/constants";
import Component from "../../assets/icons8-code-blocks-100.png";
import Info from "../../assets/icons8-info-50.png";

/**
 * @name TemplateForm
 * @description form to crate a new template for pages
 * @returns Component
 */
function TemplateForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ titleError: false, nameError: false });
  const [template, setTemplate] = useState({
    title: "",
    name: "",
    disabled: true,
  });
  const [defaultContainer, setDefaultContainer] = useState({} as any);
  const [containers, setContainers] = useState([]);

  /**
   * @name handleClick
   * @description handles submit button click and verifying inputs are valid before navigating
   */
  function handleClick() {
    const finalTemplate = template;
    const result = Validation.verifyForm(finalTemplate);

    if (result.valid) {
      setErrors({ titleError: false, nameError: false });

      if (!finalTemplate.name) {
        finalTemplate.name = Common.formatTitle(
          template.title,
          false,
        ).toLowerCase();
      } else {
        finalTemplate.name = finalTemplate.name.toLowerCase();
      }

      window.fileOperations
        .createTemplate(finalTemplate, defaultContainer)
        .then((created: any) => {
          if (!created) {
            Common.toast(
              "error",
              finalTemplate.name ? ERROR.NAME_EXISTS : ERROR.TITLE_EXISTS,
            );
          } else {
            navigate("/editor/template", {
              state: {
                template: finalTemplate.name,
              },
            });
          }
        });
    } else {
      setErrors(result.errors);

      result.messages.forEach((message) => {
        Common.toast("error", message);
      });
    }
  }

  /**
   * @name onChange
   * @description handles updating inout changes on form and saves the data o verify on page submit
   * @param e
   */
  function onChange(e: any) {
    const input = e.target;
    let value;

    if (input.id === "disabled") {
      if (e.target?.value === "no") {
        value = false;
      } else value = true;
    } else {
      value = input.value;
    }

    setTemplate({
      ...template,
      [input.id]: value,
    });
  }

  /**
   * @name handleContainerClick
   * @description handles choosing and setting up base properties for default container on template
   * @param item container that was clicked
   */
  function handleContainerClick(item: any) {
    const container = item;

    container.name = [container.name, 0].join("-");

    container.properties = container.properties.map((property: any) => {
      return {
        ...property,
        value: "",
      };
    });

    container.columns.map((column: any) => {
      column.components = [];
      column.properties = column.properties.map((property: any) => {
        return {
          ...property,
          value: "",
        };
      });

      return column;
    });

    setDefaultContainer(container);
  }

  /**
   * Handles getting all containers and there properties on page load
   */
  useEffect(() => {
    window.fileOperations
      .getWebComponentProperties()
      .then((properties: any) => {
        setContainers(properties.containers);
      });
  }, []);

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

  return (
    <>
      {Object.keys(defaultContainer).length > 0 ? (
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Configure Properties</h2>
          <div className={classes.form}>
            <div className={classes.inputcontainer}>
              <div className={classes.labelWrapper}>
                <label className={classes.label} htmlFor="title">
                  Title*
                </label>
                <StyledToolTip
                  title="Title for the page. Cannot contain any special characters."
                  placement="right"
                >
                  <img
                    className={classes.icon}
                    src={Info}
                    alt="title info tool tip"
                    width={20}
                    height={20}
                  />
                </StyledToolTip>
              </div>
              <input
                className={`${errors.titleError ? classes.inputError : ""} ${
                  classes.input
                }`}
                onChange={onChange}
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className={classes.inputcontainer}>
              <div className={classes.labelWrapper}>
                <label className={classes.label} htmlFor="name">
                  Name
                </label>
                <StyledToolTip
                  title="Name for the file. Cannot contain any special characters or spaces."
                  placement="right"
                >
                  <img
                    className={classes.icon}
                    src={Info}
                    alt="name info tool tip"
                    width={20}
                    height={20}
                  />
                </StyledToolTip>
              </div>
              <input
                className={`${errors.nameError ? classes.inputError : ""} ${
                  classes.input
                }`}
                onChange={onChange}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className={classes.inputcontainer}>
              <div className={classes.labelWrapper}>
                <label className={classes.label} htmlFor="disable">
                  Disable Components
                </label>
                <StyledToolTip
                  title="Disables or enables editing on pages that use template. Default is disabled."
                  placement="right"
                >
                  <img
                    className={classes.icon}
                    src={Info}
                    alt="name info tool tip"
                    width={20}
                    height={20}
                  />
                </StyledToolTip>
              </div>
              <select
                className={classes.inputBottom}
                onChange={onChange}
                name="disable"
                id="disabled"
              >
                <option>Default (Yes)</option>
                <option>Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button
              className={classes.confirmbtn}
              onClick={handleClick}
              type="button"
            >
              Create Template
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.mainWrapper}>
          <h2 className={classes.title}>Choose Container</h2>
          <div className={classes.cardsWrapper}>
            <div className={classes.cards}>
              {containers.length > 0 &&
                containers.map((item: any) => (
                  <div
                    key={item.name}
                    className={classes.card}
                    onClick={() => handleContainerClick(item)}
                    onKeyDown={() => handleContainerClick(item)}
                  >
                    <img className={classes.cardicon} src={Component} />
                    <h4 className={classes.cardtitle}>{item.title}</h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplateForm;
