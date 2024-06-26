import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import classes from "../../styles/Navigation.module.css";
import Website from "../../assets/icons8-website-50.png";
import Pages from "../../assets/icons8-pages-48.png";
import Components from "../../assets/icons8-components-32.png";
import Export from "../../assets/icons8-export-48.png";

/**
 * @name SideNav
 * @description side navigation for main window
 * @returns Component
 */
function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");

  /**
   * handles deciding what icon is selected on side nav when page is rerendered
   */
  useEffect(() => {
    const options = location.pathname.split("/");
    const cond1 =
      options.includes("page_form") ||
      options.includes("folder_form") ||
      options.includes("pages");
    let option = "";

    if (!cond1 && options[2]) {
      if (options.includes("template_form")) {
        option = "templates";
      } else {
        option = options[2];
      }
    } else {
      option = "websites";
    }

    setSelected(option);
  });

  /**
   * @name handleClick
   * @description handles navigating to specified path
   * @param path path to navigate to
   */
  function handleClick(path: string) {
    navigate(`/${path}`);
  }

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
    <div className={classes.sidebar}>
      <div className={classes.icons}>
        <button
          className={`${classes.icon} ${
            selected === "websites" ? classes.iconselected : ""
          }`}
          onClick={() => handleClick("wesbites")}
        >
          <StyledToolTip title="Websites" placement="right">
            <img style={{ width: "25px", height: "25px" }} src={Website} />
          </StyledToolTip>
        </button>
        <button
          className={`${classes.icon} ${
            selected === "templates" ? classes.iconselected : ""
          }`}
          onClick={() => handleClick("websites/templates")}
        >
          <StyledToolTip title="Templates" placement="right">
            <img style={{ width: "35px", height: "35px" }} src={Pages} />
          </StyledToolTip>
        </button>
        <button
          className={`${classes.icon} ${
            selected === "components" ? classes.iconselected : ""
          }`}
          onClick={() => handleClick("websites/components")}
        >
          <StyledToolTip title="Components" placement="right">
            <img style={{ width: "28px", height: "28px" }} src={Components} />
          </StyledToolTip>
        </button>
        <button
          className={`${classes.icon} ${
            selected === "export" ? classes.iconselected : ""
          }`}
          onClick={() => handleClick("websites/export")}
        >
          <StyledToolTip title="Export" placement="right">
            <img style={{ width: "35px", height: "35px" }} src={Export} />
          </StyledToolTip>
        </button>
      </div>
    </div>
  );
}

export default SideNav;
