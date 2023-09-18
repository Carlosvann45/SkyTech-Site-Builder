import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classes from '../../styles/Pages.module.css';
import Page from '../../assets/icons8-page-64.png';
import Common from '../../utils/common';

function Sites() {
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const [diretory, setDirectory] = useState([]);

  useEffect(() => {
    const currentDirectory = location.state.project;

    window.fileOperations.getPages(currentDirectory).then((p: any) => {
      console.log(p);
      setPages(p);
      setDirectory(currentDirectory);
    });

    console.log(diretory);
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.websites}>
        {
          pages.length !== 0 && pages.map((page) => (
            <div key={page} className={classes.card}>
              <img className={classes.cardicon} src={Page} />
              <h4 className={classes.cardtitle}>{Common.formatTitle(page, true)}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Sites;