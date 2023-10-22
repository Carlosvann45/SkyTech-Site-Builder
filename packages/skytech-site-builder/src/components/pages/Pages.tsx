import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '../../styles/Pages.module.css';
import Page from '../../assets/icons8-page-64.png';
import Common from '../../utils/common';

function Pages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pages, setPages] = useState([]);

  function navigateToEditor(page: any) {
    navigate('/editor/page', {
      state: {
        page,
        project: location.state.project
      }
    });
  }

  useEffect(() => {
    const currentDirectory = location.state.project;
    
    window.fileOperations.getPages(currentDirectory).then((p: any) => {
      setPages(p);
    });
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.websites}>
        {
          pages.length !== 0 && pages.map((page: any) => (
            <div key={page.name} className={classes.card} onClick={() => navigateToEditor(page)}>
              <img className={classes.cardicon} src={Page} />
              <h4 className={classes.cardtitle}>{Common.formatTitle(page.name, true)}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Pages;