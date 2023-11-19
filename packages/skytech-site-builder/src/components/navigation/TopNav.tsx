import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../../styles/Navigation.module.css";
import Logo from "../../assets/skytech-site-builder-light.png";
import Common from "../../utils/common";

/**
 * @name TopNav
 * @description handle displaying and navigation for the top navigation bar
 * @returns Component
 */
function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [buttonText, setButtonText] = useState("Create");

  /**
   * @name handleCreateClick
   * @description handles create click for projects, templates
   * and pages and navigates to correct form
   */
  function handleCreateClick() {
    const place = location.pathname.split("/");

    if (place.length > 2) {
      if (place[2] === "pages") {
        const project = location.state.project ?? "";

        navigate("/websites/page_form/", {
          state: {
            project,
          },
        });
      } else if (place[2] === "templates") {
        navigate("/websites/template_form");
      }
    } else {
      navigate("/websites/folder_form");
    }
  }

  /**
   * @name showCreateButton
   * @description uses a black list to help decided where not to show
   * the create button
   * @returns
   */
  function showCreateButton(): boolean {
    const path = location.pathname;
    const blacklist = ["/websites/components", "/websites/export"];

    return blacklist.includes(path.trim()) && path.split("/")[2] !== "pages";
  }

  /**
   * handles deciding what text to show in center of top navigation and create button
   */
  useEffect(() => {
    const options = location.pathname.split("/");
    let txt = "Project";
    let dir = "Websites";

    if (options.includes("pages")) {
      txt = "Page";
      dir = "Template";
    } else if (options.includes("page_form")) {
      dir = "Page Form";
    } else if (options.includes("templates")) {
      txt = "Template";
      dir = "Template";
    } else if (options.includes("template_form")) {
      dir = "Template Form";
    } else if (options.includes("folder_form")) {
      dir = "Project Form";
    }

    setButtonText(`Create ${txt}`);
    setSelected(Common.formatTitle(dir, true));
  });

  return (
    <div className={classes.topbar}>
      <div className={classes.topcontainer}>
        <img
          style={{ width: "25px", height: "20px", margin: "5px" }}
          src={Logo}
        />
        <p className={classes.title}>SkyTech Site Builder</p>
      </div>
      <div className={classes.topcontainer}>
        <p className={classes.title}>
          {selected.charAt(0).toUpperCase() + selected.slice(1)}
        </p>
      </div>
      <div className={classes.topcontainer}>
        <button
          type="button"
          className={`${classes.topbtn} ${showCreateButton() && classes.hide}`}
          onClick={handleCreateClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default TopNav;
