import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/Navigation.module.css';
import Website from '../../assets/icons8-website-50.png';
import Pages from '../../assets/icons8-pages-48.png';
import Components from '../../assets/icons8-components-32.png';
import Export from '../../assets/icons8-export-48.png';

function SideNav() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const option = window.location.pathname.split('/');

    setSelected(option[1]);
  }, [window.location.pathname]);

  function handleClick(path: string) {
    navigate(`/${path}`)
  }

  return (
    <div className={classes.sidebar}>
        <div className={classes.icons}>
          {/*@ts-ignore*/}
          <button 
            data-tooltip-id="website-tool-tip" 
            data-tooltip-content="Website"
            data-tooltip-place="right-end"
            className={`${classes.icon} ${selected === 'websites' ? classes.iconselected : ''}`} 
            onClick={() => handleClick('')} >
            <span className={classes.tooltip}>Website</span>
            <img style={{ width: '25px', height: '25px' }} src={Website} />
          </button>
          <button className={`${classes.icon} ${selected === 'templates' ? classes.iconselected : ''}`}  onClick={() => handleClick('templates')}>
            <span className={classes.tooltip}>Templates</span>
            <img style={{ width: '35px', height: '35px' }} src={Pages}/>
          </button>
          <button className={`${classes.icon} ${selected === 'components' ? classes.iconselected : ''}`} onClick={() => handleClick('components')}>
            <span className={classes.tooltip}>Components</span>
            <img style={{ width: '28px', height: '28px' }} src={Components} />
          </button>
          <button className={`${classes.icon} ${selected === 'export' ? classes.iconselected : ''}`} onClick={() => handleClick('export')}>
            <span className={classes.tooltip}>Export</span>
            <img style={{ width: '35px', height: '35px' }} src={Export} />
          </button>
        </div>
    </div>
  );
}

export default SideNav;