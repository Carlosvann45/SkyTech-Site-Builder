import { useState, useEffect, useRef } from 'react';
import ComponentModal from '../modals/ComponentModal';
import ColumnEditor from './ColumnEditor';
import Edit from '../../assets/icons8-edit-24.png';
import Plus from '../../assets/icons8-plus-24.png';
import Trash from '../../assets/icons8-trash-30.png';
import classes from '../../styles/EditorTools.module.css';

function ContainerEditor(props: any) {
    const [clicked, setClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef() as any;
    const insideRef = useRef() as any;

    function addComponent(name: string) {
        const length = props.componentName.split('-').length - 1;
        const newIndex = Number(props.componentName.split('-')[length]);
        let newComponent = {} as any;
    
        switch(name) {
            case 'SkyTech Heading':
                newComponent = {
                    "name": `skytech-heading-${newIndex}`,
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
                    "name": `skytech-text-${newIndex}`,
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
    
        props.components.forEach((component: any, index: number) => {
            const nameArr = component.name.split('-');
            const length = nameArr.length - 1;
            
            if (newIndex === index) {
                newArray.push(newComponent);
    
                nameArr[length] = index + 1;
    
                const newName = nameArr.join('-');
    
                component.name = newName;
    
                newArray.push(component);
            } else {
                if (index > newIndex ) {
    
                    nameArr[length] = index + 1
    
                    const newName = nameArr.join('-');
    
                    component.name = newName;
                }
    
                newArray.push(component);
            }
        });

        props.setComponents(newArray);
      }
    
      function deleteCallback() {
        const newArray = [] as any;
        let removed = false;
    
        props.components.forEach((component: any, index: number) => {
            const nameArr = component.name.split('-');
            const length = nameArr.length - 1;
            
            if (component.name === props.componentName && !removed) {
                removed = true;
            } else {
                if (removed) {
    
                    nameArr[length] = index - 1
    
                    const newName = nameArr.join('-');
    
                    component.name = newName;
                }
    
                newArray.push(component);
            }
        });
    
        props.setComponents(newArray)
      }

      function setNewColumn(c: any) {
        const newArr = [] as any;
        const newColumnArr = [] as any;
        const actualComponents = props.components;
        const actualComponent = actualComponents.find((x: any) => x.name === props.component.name);

        actualComponent.columns.forEach((column: any) => {
            if (column.name === c.column) {
                newColumnArr.push(c);
            } else {
                newColumnArr.push(column);
            }
        })

        actualComponent.columns = newColumnArr;

        actualComponents.forEach((component: any) => {
            if (component.name === props.component.name) {
                newArr.push(actualComponent);
            } else {
                newArr.push(component);
            }
        })

        props.setComponents(newArr);
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
    <div ref={wrapperRef}>
        <button className={clicked ? classes.iconBtnFirst : classes.hideIconBtn} onClick={() => {}}>
            <img src={Edit} width="15px" height="15px" />
        </button>
        <button type="button" className={clicked ? classes.iconBtn : classes.hideIconBtn} onClick={() => setOpen(true)}>
            <img src={Plus} width="15px" height="15px"  />
        </button>
        <button className={clicked ? classes.iconBtnLast : classes.hideIconBtn} onClick={() => deleteCallback()}>
            <img src={Trash} width="15px" height="15px" />
        </button>
        <div className={`${classes.containerWrapper} ${clicked ? classes.wrapper : ''}`}>
            <props.tag ref={insideRef}>
                {
                    props.component.columns.map((c: any, i: any) => (
                        <ColumnEditor 
                            key={c.name}
                            index={i}
                            column={c}
                            setColumn={setNewColumn}
                        />
                    ))
                }
            </props.tag>
            <div className={classes.containerBtnContainer}>
                <button type="button" className={classes.containerBtn} onClick={() => setClicked(true)}>Container</button>
            </div>
        </div>
        <ComponentModal 
            open={open} 
            setOpen={setOpen}
            callback={addComponent} />
    </ div>
    )
}

export default ContainerEditor