import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../styles/Sites.module.css";
import Folder from "../../assets/icons8-folder-30.png";
import Common from "../../utils/common";

/**
 * @name Sites
 * @description handles loading all projects currently created for a user
 * @returns COmponent
 */
function Sites() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  /**
   * @name goToPages
   * @description handles navigating to pages page
   * @param project project for pages to load
   */
  function goToPages(project: string) {
    navigate("/websites/pages", {
      state: {
        project,
      },
    });
  }

  /**
   * Handles loading all current projects created
   */
  useEffect(() => {
    window.fileOperations.getProjects().then((dir: any) => {
      setProjects(dir);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.websites}>
        {projects.length !== 0 &&
          projects.map((project) => (
            <div
              key={project}
              className={classes.card}
              onClick={() => goToPages(project)}
              onKeyDown={() => goToPages(project)}
            >
              <img className={classes.cardicon} src={Folder} />
              <h4 className={classes.cardtitle}>
                {Common.formatTitle(project, true)}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sites;
