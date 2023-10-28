import { useEffect, useState } from 'react';
import Close from '../../assets/icons8-close-30.png';
import Done from '../../assets/icons8-done-26.png';
import classes from '../../styles/Modal.module.css';

function PropertiesModal(props: any) {
  const [selected, setSelected] = useState('properties');
  const [changedProperties, setChangedProperties] = useState({} as any);
  const [component, setComponent] = useState({ title: '', properties: []} as any);

  function loadInput(property: any) {
    
    if (property.type === 'textarea') {
        return (
            <textarea name={property.name} 
                      className={classes.modalInput} 
                      onChange={(e: any) => handleOnChange(e, property)}
                      value={changedProperties[property.name]}
                      rows={4} cols={50}></textarea>
        );
    } else if (property.type === 'option') {
        return (
            <select name={property.name} 
                    className={classes.modalInput}
                    onChange={(e: any) => handleOnChange(e, property)}
                    value={changedProperties[property.name]}>
            {
                property.values.map((value: any) => (
                    <option key={value} value={value}>{value}</option>
                ))
            }
            </select>
        );
    } else {
        return (<input type={property.type} 
                       name={property.name} 
                       className={classes.modalInput}
                       onChange={(e: any) => handleOnChange(e, property)}
                       value={changedProperties[property.name]} />);
    }
  }

  function loadTab() {
    if (selected === 'properties') {
        return (
            component.properties.map((property: any) => {
                return (
                    <div key={property.name} className={classes.modalField}>
                        <label className={classes.modalLabel} htmlFor={property.name}>{property.title}</label>
                        {loadInput(property)}
                    </div>)
            })
        );
    } else {
        return (
            component.columns.map((column: any) => {
                if (column.name === selected) {
                    return (
                        column.properties.map((property: any) => {
                            return (
                                <div key={property.name} className={classes.modalField}>
                                    <label className={classes.modalLabel} htmlFor={property.name}>{property.title}</label>
                                    {loadInput(property)}
                                </div>)
                        }))
                }
            })
        )
    }
  }

  function handleOnChange(e: any, property: any) {
    const target = e.target;
    const newProperties = {
        ...changedProperties,
        [property.name]: target.value
    }

    console.log(newProperties);

    setChangedProperties(newProperties);
  }

  function submitChanges() {
    const newProperties = [] as any;

    component.properties.forEach((property: any) => {
        newProperties.push({
            ...property,
            value: changedProperties[property.name]
        });
    });

    const finalComponent = component;

    finalComponent.properties = newProperties;

    props.callback(finalComponent);
    props.setOpen(false)
  }

  useEffect(() => {
        if (props?.component?.title) {
            let newProperties = {};

            props.component.properties.forEach((property: any) => {
                newProperties = {
                    ...newProperties,
                    [property.name]: property?.value ?? ''
                }
            })
            
            setChangedProperties(newProperties);
            setComponent(props.component);
        }
  }, [props.component]);

  return (
    <dialog className={classes.showModal} open={props.open}>
        <div className={classes.properitesModal}>
            <header className={classes.modalHeader}>
                <h3 className={classes.modalTitle}>{component.title}</h3>
                <div className={classes.modalBtnContainer}>
                    <button type="button" className={classes.modalBtn}  onClick={() => props.setOpen(false)}>
                        <img src={Close} width="20px" height="20px" />
                    </button>
                    <button type="button" className={classes.modalBtn}>
                        <img src={Done} width="22px" height="22px" onClick={() => submitChanges()} />
                    </button>
                </div>
            </header>
            <div className={classes.headerSpacer}></div>
            <div className={classes.tabs}>
                <div className={`${classes.tabOption} ${selected === 'properties' ? classes.tabSelected : ''}`}
                     onClick={() => setSelected('properties')}>Properties</div>
                {
                    component?.columns?.length > 0 && component.columns.map((column: any) => (
                        column.properties.length > 0 && (
                        <div key={column.name} 
                             onClick={() => setSelected(column.name)}
                             className={`${classes.tabOption} ${selected === column.name ? classes.tabSelected : ''}`}>{column.title}</div>)
                    ))
                }
            </div>
            <div className={classes.properties}>
                {loadTab()}
            </div>
        </div>
    </dialog>
  );
}

export default PropertiesModal;