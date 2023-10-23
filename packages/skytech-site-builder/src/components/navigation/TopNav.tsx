import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '../../styles/Navigation.module.css';
import Logo from '../../assets/logo_grey_transparent.png';
import Common from '../../utils/common';

function TopNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState('');
    const [buttonText, setButtonText] = useState('Create');

    function handleCreateClick() {
        const place = window.location.pathname.split('/')

        if (place.length > 2) {
          if (place[2] === 'pages') {
            const pathArr = window.location.pathname.split('/');
            const project = pathArr[pathArr.length - 1];

            navigate(`/${place[1]}/page_form/${project}`);
          }
        } else {
            navigate(`/${place[1]}/folder_form`);
        }
    }

    function showCreateButton(): boolean {
      const path = window.location.pathname;
      let cond2 = false;

      if (path.split('/').length > 2) {
        cond2 = path.split('/')[2] !== 'pages';
      }
      return path.split('/')[1] !== 'websites' || cond2;
    }
  
    useEffect(() => {
      const option = window.location.pathname.split('/');
      const dir = location.state?.project;
      
      setButtonText(`Create ${option.includes('pages') ? 'Page' : 'Project'}`);
      setSelected(dir ? Common.formatTitle(dir, true) : option[1]);
    }, [location]);
  
    return (
      <div className={classes.topbar}>
        <div className={classes.topcontainer}>
            <img style={{ width: '35px', height: '28px', marginTop: '5px', marginLeft: '4px' }} src={Logo} />
            <p className={classes.title}>SkyTech Site Builder</p>
        </div>
        <div className={classes.topcontainer}>
            <p className={classes.title}>{selected.charAt(0).toUpperCase() + selected.slice(1)}</p>
        </div>
        <div className={classes.topcontainer}>
            <button 
                type="button" 
                className={`${classes.topbtn} ${showCreateButton() && classes.hide}`}
                onClick={handleCreateClick}>{buttonText}</button>
            <button type="button" className={`${classes.topbtn} ${selected !== 'pages' && classes.hide}`}>Edit Project</button>
        </div>
      </div>
    );
  }
  
  export default TopNav;