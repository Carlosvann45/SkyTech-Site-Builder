import { useState, useEffect, useRef } from 'react';
import ComponentModal from '../modals/ComponentModal';
import PropertiesModal from '../modals/PropertiesModal';
import Edit from '../../assets/icons8-edit-24.png';
import Plus from '../../assets/icons8-plus-24.png';
import Trash from '../../assets/icons8-trash-30.png';
import classes from '../../styles/EditorTools.module.css';

function ComponentEditor(props: any) {
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openProperties, setOpenProperties] = useState(false);
  const [propertiesComponent, setPropertiesComponent] = useState({});
  const wrapperRef = useRef() as any;

  function addComponent(newComponent: any) {
    const length = props.componentName.split('-').length - 1;
    const newIndex = Number(props.componentName.split('-')[length]);

    const newArray = [] as any;

    props.components.forEach((component: any, index: number) => {
        if (edit) {

          if (component.name === newComponent.name) {
            newArray.push(newComponent);
          } else {
            newArray.push(component);
          }
          return;
        }

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

    setEdit(false);
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

  async function setNewComponent(name: string) {
    const length = props.componentName.split('-').length - 1;
    const newIndex = Number(props.componentName.split('-')[length]);

    window.fileOperations.getWebComponentProperties().then((properties: any) => {
        const allComponents = [...properties.components, ...properties.containers];
        let actualComponent: any = {};
        
        allComponents.forEach((item) => {
            if(item.title === name){
              actualComponent = item
            }
        });

        const newProperties = [] as any;

        actualComponent.properties.forEach((property: any) => {
          newProperties.push({
            ...property,
            value: ''
          })
        });

        actualComponent.properties = newProperties;

        if (actualComponent.type === 'container') {
          const newColumns = [] as any;

          actualComponent.columns.forEach((column: any) => {
            const newColumnProps = [] as any;

            column.properties.forEach((property: any) => {
              newColumnProps.push({
                ...property,
                value: ''
              });
            });

            column.properties = newColumnProps;
            column.components = [];

            newColumns.push(column);
          });

          actualComponent.columns = newColumns;
        }
        return actualComponent;
    }).then((createdComponent: any) => {
      createdComponent.name = [createdComponent.name, newIndex].join('-');

      setPropertiesComponent(createdComponent);
      setOpenProperties(true);
    });
  }

  function editComponent() {
    let found = false;
    let component = null as any;

    props.components.forEach((c: any) => {
      if ((c.name === props.componentName) && !found) {
        component = c;
        found = true;
      }
    })
    
    setPropertiesComponent(component);
    setOpenProperties(true);
    setEdit(true);
  }

  function notDisabled() {
    const pathArr = window.location.pathname.split('/');

    if (pathArr[2] !== 'template') {
      return !props.component.disabled
    } else return true
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickListener);
    
    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, []);

  const handleClickListener = (event: any) => {
    const clickedInside = wrapperRef?.current?.contains(event.target);

    if (clickedInside) {
        setClicked(true);
    } else {
        setClicked(false);
    }
  }

  return (
    <div ref={wrapperRef}>
        <button className={clicked && notDisabled()? classes.iconBtnFirst : classes.hideIconBtn} onClick={() => editComponent()}>
            <img src={Edit} width="15px" height="15px" />
        </button>
        <button type="button" className={clicked ? classes.iconBtn : classes.hideIconBtn} onClick={() => setOpen(true)} >
            <img src={Plus} width="15px" height="15px" />
        </button>
        <button className={clicked && notDisabled() ? classes.iconBtnLast : classes.hideIconBtn} onClick={() => deleteCallback()}>
            <img src={Trash} width="15px" height="15px" />
        </button>
        <div className={clicked ? classes.wrapper : ''}>
          <div style={{ minHeight: '25px' }} className={classes.hover}>
            {props.tag}
          </div>
        </div>
        <ComponentModal 
            open={open} 
            setOpen={setOpen}
            callback={setNewComponent} />
        <PropertiesModal 
            open={openProperties}
            setOpen={setOpenProperties}
            component={propertiesComponent}
            callback={addComponent}
            />
    </ div>
  );
}

export default ComponentEditor;