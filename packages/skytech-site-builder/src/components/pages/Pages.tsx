import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/Pages.module.css';
import Page from '../../assets/icons8-page-64.png';
import Common from '../../utils/common';

function Pages() {
  const navigate = useNavigate();
  const [project, setProject] = useState('');
  const [pages, setPages] = useState([]);

  function navigateToEditor(page: string) {
    navigate(`/editor/page/${project}/${page}`);
  }

  useEffect(() => {
    const pathArr = window.location.pathname.split('/');
    const newProject = pathArr[pathArr.length - 1]
    
    setProject(newProject);
    
    window.fileOperations.getPages(newProject).then((p: any) => {
      setPages(p);
    });
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.websites}>
        {
          pages.length !== 0 && pages.map((page: any) => (
            <div key={page.name} className={classes.card} onClick={() => navigateToEditor(page.name)}>
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