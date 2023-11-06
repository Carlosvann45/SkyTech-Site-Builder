import { useEffect, useState } from 'react';
import Common from '../../utils/common';
import classes from '../../styles/Export.module.css';
import Website from '../../assets/icons8-website-50-2.png';

function Export() {
  const [projects, setProjects] = useState([]);

    async function openDialog(project: string) {
        await window.fileOperations.exportSite(project);
    }

    useEffect(() => {
      window.fileOperations.getProjects().then((dir: any) => {
        setProjects(dir)
      });
    }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.exports}>
        {
          projects.length !== 0 && projects.map((project: any) => (
            <div key={project} className={classes.card} onClick={() => openDialog(project)}>
              <img className={classes.cardicon} src={Website} />
              <h4 className={classes.cardtitle}>{Common.formatTitle(project, true)}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Export;