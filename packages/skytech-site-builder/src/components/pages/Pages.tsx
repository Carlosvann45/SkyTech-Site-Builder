import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../../styles/Pages.module.css";
import Page from "../../assets/icons8-page-64.png";
import Common from "../../utils/common";

/**
 * @name Pages
 * @description handles loading pages for users to open and edit
 * @returns Component
 */
function Pages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState("");
  const [pages, setPages] = useState([]);

  /**
   * @name navigateToEditor
   * @description navigates to editor to edit page from project
   * @param page page to open
   */
  function navigateToEditor(page: string) {
    navigate("/editor/page", {
      state: {
        project,
        page,
      },
    });
  }

  /**
   * handles loading pages from a selected project
   */
  useEffect(() => {
    const actualProject = location.state.project ?? "";

    setProject(actualProject);

    window.fileOperations.getPages(actualProject).then((p: any) => {
      setPages(p);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.websites}>
        {pages.length !== 0 &&
          pages.map((page: any) => (
            <div
              key={page.name}
              className={classes.card}
              onClick={() => navigateToEditor(page.name)}
              onKeyDown={() => navigateToEditor(page.name)}
            >
              <img className={classes.cardicon} src={Page} />
              <h4 className={classes.cardtitle}>
                {Common.formatTitle(page.title, true)}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Pages;
