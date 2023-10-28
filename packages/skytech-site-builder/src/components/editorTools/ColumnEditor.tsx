import React, { useState, useEffect, useRef } from 'react';
import ComponentModal from '../modals/ComponentModal';
import ContainerEditor from './ContainerEditor';
import ComponentEditor from './ComponentEditor';
import Edit from '../../assets/icons8-edit-24.png';
import Plus from '../../assets/icons8-plus-24.png';
import classes from '../../styles/EditorTools.module.css';

function ColumnEditor(props: any) {
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef() as any;
    const insideRef = useRef() as any;
  
    function addComponent(name: string) {
      let newComponent: any;
  
      switch(name) {
          case 'SkyTech Heading':
              newComponent = {
                  "name": `skytech-heading-0`,
                  "type": "component",
                  "properties": [
                    {
                      "name": "content",
                      "value": "Test Title"
                    },
                    {
                      "name": "color",
                      "value": "#fff"
                    },
                    {
                      "name": "textAlign",
                      "value": "center"
                    },
                    {
                      "name": "heading",
                      "value": 1
                    },
                    {
                      "name": "fontSize",
                       "value": "25px"
                    },
                    {
                      "name": "fontWeight",
                       "value": "500"
                    }
                  ]
                }
              break;
          case 'SkyTech Text':
          default:
              newComponent = {
                  "name": `skytech-text-0`,
                  "type": "component",
                  "properties": [
                    {
                      "name": "content",
                      "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu est nec ipsum porttitor bibendum ut ut ipsum. Sed risus nunc, rutrum mattis arcu id, imperdiet elementum lacus. Vestibulum at volutpat quam, nec sodales mi. Fusce eu magna sed neque faucibus fermentum id et nisi. Sed id condimentum libero. Nunc hendrerit mi nisi, tempus blandit velit ultrices ut. Phasellus finibus vel velit sodales facilisis. Maecenas tempor elit in pharetra euismod."
                    },
                    {
                      "name": "color",
                      "value": "#fff"
                    },
                    {
                      "name": "textAlign",
                      "value": "left"
                    },
                    {
                      "name": "margin",
                      "value": "25px auto 0 auto"
                    },
                    {
                      "name": "width",
                      "value": "75%"
                    }
                  ]
                }
              break;
      }
  
      const newArray = [] as any;
      
      newArray.push(newComponent);
  
      props.column.components.forEach((c: any) => {
          const component = c;
          const nameArr = component.name.split('-');
          const length = nameArr.length - 1;
          const newIndex = Number(nameArr[length]) + 1;
          console.log(nameArr)
          nameArr.pop();
          nameArr.push(newIndex);

          component.name = nameArr.join('-');

          newArray.push(component);
      });

      setComponents(newArray);
    }

    function formatComponentTag(component: any) {
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
    
      function formatContainerTag(component: any) {
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

    function setComponents(c: any) {
        const newColumn = props.column;

        newColumn.components = c;

        props.setColumn(newColumn);
    }
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickListener);
      
      return () => {
        document.removeEventListener('mousedown', handleClickListener);
      };
    }, []);
  
    const handleClickListener = (event: any) => {
        const nestedClick = insideRef?.current.contains(event.target);
        const clickedInside = wrapperRef?.current?.contains(event.target);
        
        if (clickedInside && !nestedClick) {
            setClicked(true);
        } else {
            setClicked(false);
        }
    }

  return (
    <div slot={props.column.name} ref={wrapperRef}>
        <button type="button" className={clicked ? classes.iconBtnLast : classes.hideIconBtn} onClick={() => setOpen(true)} >
            <img src={Plus} width="15px" height="15px" />
        </button>
        <div ref={insideRef} className={`${classes.containerWrapper} ${clicked ? classes.wrapper : ''}`}>
            {
                props.column.components.map((c: any) => {
                    if (c.type === 'component') {
                        return (
                            <ComponentEditor 
                                key={c.name}
                                componentName={c.name}
                                component={formatComponentTag(c)}
                                components={props.column.components}
                                setComponents={setComponents} />
                        )
                    } else {
                        return (
                            <ContainerEditor 
                                key={c.name}
                                tag={formatContainerTag(c)}
                                componentName={c.name}
                                component={c} 
                                components={props.column.components}
                                setComponents={setComponents} />
                        );
                    }
                })
            }
            <div className={classes.columnBtnContainer}>
                <button type="button" className={classes.columnBtn} onClick={() => setClicked(true)}>{props.column.title}</button>
            </div>
        </div>
        <ComponentModal 
            open={open} 
            setOpen={setOpen}
            callback={addComponent} />
    </ div>
  );
  }
  
  export default ColumnEditor;