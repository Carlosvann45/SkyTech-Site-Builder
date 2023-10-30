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
          } else if (place[2] === 'templates') {
            navigate(`/${place[1]}/template_form`);
          }
        } else {
            navigate(`/${place[1]}/folder_form`);
        }
    }

    function showCreateButton(): boolean {
      const path = window.location.pathname;
      let cond1 = false;
      let cond2 = false;
      let cond3 = false;
      
      cond1 = path.split('/')[1] !== 'websites'
      
      if (path.split('/').length > 2) {
        cond2 = path.split('/')[3] === 'pages';
        cond3 = path.split('/')[3] === 'templates';
        console.log(path.split('/')[2])
      }
      return cond1 || cond2 || cond3;
    }
  
    useEffect(() => {
      const options = window.location.pathname.split('/');
      let txt = 'Project';
      let dir = options[1];

      if (options[3]) {
        dir = options[3];
      } else if (options[2]) {
        dir = options[2];
      }

      if (options.includes('pages')) {
        txt = 'Page';
      } else if (options.includes('templates')) {
        txt = 'Template';
      }
      
      setButtonText(`Create ${txt}`);
      setSelected(Common.formatTitle(dir, true));
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
        </div>
      </div>
    );
  }
  
  export default TopNav;