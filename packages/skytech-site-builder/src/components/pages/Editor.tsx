import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentEditor from '../editorTools/ComponentEditor';
import ContainerEditor from '../editorTools/ContainerEditor';
import Logo from '../../assets/logo_grey_transparent.png';
import navClasses from '../../styles/Navigation.module.css';
import classes from '../../styles/Editor.module.css';
import Common from '../../utils/common';
import ContainerPreview from '../preview/ContainerPreview';

function Editor() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [pageData, setPageData] = useState({ name: 'Editor', components: [] });
  const [components, setComponents] = useState([]);

  function formatComponentTag(component: any) {
    let nameArr = component.name.split('-');
    let tags = {};
    if (edit) {
        tags = {
            class: classes.editHover
        };

    }

    for (const property of component.properties) {
        tags = {
            ...tags,
            [property.name]: property.value
        };
    }

    nameArr.pop();

    return React.createElement(`${nameArr.join('-')}`, tags);
  }

  function formatContainerTag(component: any) {
    let nameArr = component.name.split('-');
    let tags = {};
    if (edit) {
        tags = {
            class: classes.editHover
        };

    }

    for (const property of component.properties) {
        tags = {
            ...tags,
            [property.name]: property.value
        };
    }

    for (const column of component.columns) {
        for (const property of column.properties) {
            tags = {
                ...tags,
                [property.name]: property.value
            };
        }
    }

    nameArr.pop();

    return `${nameArr.join('-')}`;
  }

  useEffect(() => {
    const pathArr = window.location.pathname.split('/');
    const page = pathArr[pathArr.length - 1];
    const project = pathArr[pathArr.length - 2];
    
    window.fileOperations.getPages(project).then((p: any) => {
        const newPageData = p.find((p: any) => p.name === page);

        setPageData(newPageData);
        setComponents(newPageData.components);
    });
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
                components.length > 0 && components.map((c: any) => {
                if (edit) {
                    if (c.type === 'component') {
                        return (
                        <div className={classes.editHover} key={c.name}>
                            <ComponentEditor 
                                componentName={c.name}
                                component={formatComponentTag(c)} 
                                components={components}
                                setComponents={setComponents} />
                        </ div>);
                    } else {
                        return (
                            <ContainerEditor 
                                key={c.name}
                                tag={formatContainerTag(c)}
                                componentName={c.name}
                                component={c} 
                                components={components}
                                setComponents={setComponents} />
                        );
                    }
                } else if (c.type === 'component') {
                    return formatComponentTag(c);
                } else {
                    return <ContainerPreview
                                key={c.name}
                                tag={formatContainerTag(c)}
                                component={c} />
                }})
            }
          </ div>
        </div>
    </>
  );
}

export default Editor;