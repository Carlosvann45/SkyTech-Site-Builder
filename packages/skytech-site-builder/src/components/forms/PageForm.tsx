import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Validation from "../../utils/validation";
import Common from "../../utils/common";
import classes from "../../styles/Form.module.css";
import { ERROR } from "../../utils/constants";
import Info from "../../assets/icons8-info-50.png";
import Template from "../../assets/icons8-template-100.png";

/**
 * @name PageForm
 * @description form to crate a new page for a project
 * @returns Component
 */
function PageForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({ titleError: false, nameError: false });
  const [page, setPage] = useState({ title: "", name: "" });
  const [defaultTemplate, setDefaultTemplate] = useState({} as any);
  const [templates, setTemplates] = useState([]);

  /**
   * @name handleClick
   * @description handles submit button click and verifying inputs are valid before navigating
   */
  function handleClick() {
    const project = location.state.project ?? "";
    const finalPage = page;
    const result = Validation.verifyForm(finalPage);

    if (result.valid) {
      setErrors({ titleError: false, nameError: false });

      if (!finalPage.name) {
        finalPage.name = Common.formatTitle(page.title, false).toLowerCase();
      } else {
        finalPage.name = finalPage.name.toLowerCase();
      }

      window.fileOperations
        .createPage(project, finalPage, defaultTemplate)
        .then((created: any) => {
          if (!created) {
            Common.toast(
              "error",
              finalPage.name ? ERROR.NAME_EXISTS : ERROR.TITLE_EXISTS,
            );
          } else {
            navigate("/editor/page", {
              state: {
                project,
                page: finalPage.name,
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

    setPage({
      ...page,
      [input.id]: input.value,
    });
  }

  /**
   * handles loading templates to choose from on form load
   */
  useEffect(() => {
    window.fileOperations.getTemplates().then((templates: any) => {
      setTemplates(templates);
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
      {Object.keys(defaultTemplate).length > 0 ? (
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
            <button
              className={classes.confirmbtn}
              onClick={handleClick}
              type="button"
            >
              Create Page
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.mainWrapper}>
          <h2 className={classes.title}>Choose Template</h2>
          <div className={classes.cardsWrapper}>
            <div className={classes.cards}>
              {templates.length > 0 &&
                templates.map((item: any) => (
                  <div
                    key={item.name}
                    className={classes.card}
                    onClick={() => setDefaultTemplate(item)}
                    onKeyDown={() => setDefaultTemplate(item)}
                  >
                    <img className={classes.cardicon} src={Template} />
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

export default PageForm;
