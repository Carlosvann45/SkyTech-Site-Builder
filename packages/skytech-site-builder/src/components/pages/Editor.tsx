import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentEditor from '../editorTools/ComponentEditor';
import ContainerEditor from '../editorTools/ContainerEditor';
import Logo from '../../assets/logo_grey_transparent.png';
import navClasses from '../../styles/Navigation.module.css';
import classes from '../../styles/Editor.module.css';
import Common from '../../utils/common';

function Editor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(true);
  const [pageData, setPageData] = useState({ name: 'Editor', components: [] });
  const [components, setComponents] = useState([]);

  function formatTag(component: any) {
    let nameArr = component.name.split('-');
    let tags = {
        class: classes.editHover
    };

    for (const property of component.properties) {
        tags = {
            ...tags,
            [property.name]: property.value
        };
    }

    nameArr.pop();

    return React.createElement(`${nameArr.join('-')}`, tags);
  }

  useEffect(() => {
    const page = location.state.page;

    if (page) {
        setPageData(page);
        setComponents(page.components);
    }
  }, []);

  return (
    <>
        <div className={navClasses.topbar}>
            <div className={navClasses.topcontainer}>
                <img style={{ width: '35px', height: '28px', marginLeft: '4px' }} className={navClasses.hover} src={Logo} onClick={() => navigate('/websites')}/>
            </div>
            <div className={navClasses.topcontainer}>
                <p className={navClasses.title}>{Common.formatTitle(pageData.name, true)}</p>
            </div>
            <div className={navClasses.topcontainer}>
                <p className={navClasses.switchText}>Edit</p>
                <input type="checkbox" name="switch" id="switch" className={navClasses.input} onClick={() => setEdit(!edit)}/>
                <label htmlFor="switch" className={navClasses.label}></label>
                <p style={{ marginRight: '8px' }} className={navClasses.switchText}>Preview</p>
            </div>
        </div>
        <div className={classes.maincontent}>
          {/* add side bar later*/}
          <div className={classes.pagecontainer}>
            {
                components.length > 0 && components.map((component: any, index: number) => {
                if (edit) {
                    if (component.type === 'component') {
                        return (
                        <div className={classes.editHover} key={component.name}>
                            <ComponentEditor 
                                componentName={component.name}
                                component={formatTag(component)} 
                                components={components}
                                setComponents={setComponents} />
                        </ div>);
                    } else {
                        return (
                            <ContainerEditor 
                                key={component.name}
                                component={formatTag(component)} 
                                editCallback={() => console.log(`edit: ${component.name} index: ${index}`)} 
                                addCallback={() => console.log(`add: ${component.name} index: ${index}`)}
                                trashCallback={() => console.log(`trash: ${component.name} index: ${index}`)} />
                        );
                    }
                } else {
                    return formatTag(component);
                }})
            }
          </ div>
        </div>
    </>
  );
}

export default Editor;