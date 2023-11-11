import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/Navigation.module.css';
import Logo from '../../assets/skytech-site-builder-light.png';
import Common from '../../utils/common';

function TopNav() {
    const navigate = useNavigate();
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
      const whitelist = [
        '/websites',
        '/websites/templates'
      ];

      return !whitelist.includes(path.trim()) && path.split('/')[2] !== 'pages';
    }
  
    useEffect(() => {
      const options = window.location.pathname.split('/');
      let txt = 'Project';
      let dir = 'Websites';

      if (options[2]) {
        if (options[2] === 'template_form') {
          dir = 'Creating Template';
        } else if (options[2] === 'page_form') {
          dir = 'Creating page: ' + options[3];
        } else if (options[2] === 'folder_form') {
          dir = 'Creating Project';
        } else if (options[3]) {
          dir = options[3];
        } else {
          dir = options[2];
        }
      } else if (options[3]) {
        dir = options[3];
      } 

      if (options.includes('pages')) {
        txt = 'Page';
      } else if (options.includes('templates')) {
        txt = 'Template';
      }
      
      setButtonText(`Create ${txt}`);
      setSelected(Common.formatTitle(dir, true));
    });
  
    return (
      <div className={classes.topbar}>
        <div className={classes.topcontainer}>
            <img style={{ width: '25px', height: '20px', margin: '5px' }} src={Logo} />
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