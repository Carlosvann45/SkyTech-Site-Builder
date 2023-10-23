import { useEffect, useState } from 'react';
import Close from '../../assets/icons8-close-30.png';
import Done from '../../assets/icons8-done-26.png';
import classes from '../../styles/Modal.module.css';

function PropertiesModal(props: any) {
  const [component, setComponent] = useState({} as any);

  function loadInput(property: any) {
    
    if (property.type === 'textarea') {
        return (
            <textarea name={property.name} className={classes.modalInput} rows={4} cols={50}></textarea>
        );
    } else if (property.type === 'option') {
        return (
            <select name={property.name} className={classes.modalInput}>
            {
                property.values.map((value: any) => (
                    <option key={value} value={value}>{value}</option>
                ))
            }
            </select>
        );
    } else if (property.type === 'number') {
        return (<input type={property.type} name={property.name} className={classes.modalInput} />);
    } else {
        return (<input type={property.type} name={property.name} className={classes.modalInput} />);
    }
  }

  useEffect(() => {
    window.fileOperations.getWebComponentProperties().then((properties: any) => {
        const nameArr = props.componentName.split('-');
        const allComponents = [...properties.components, ...properties.containers];

        nameArr.pop();

        const name = nameArr.join('-');

        const actualComponent = allComponents.find((x: any) => x.name === name);

        setComponent(actualComponent); 
    });
  }, [props.componentName]);

  return (
    <dialog className={classes.showModal} open={props.open}>
        <div className={classes.properitesModal}>
            <header className={classes.modalHeader}>
                <h3 className={classes.modalTitle}>{component.title}</h3>
                <div className={classes.modalBtnContainer}>
                    <button type="button" className={classes.modalBtn}>
                        <img src={Close} width="20px" height="20px" onClick={() => props.setOpen(false)} />
                    </button>
                    <button type="button" className={classes.modalBtn}>
                        <img src={Done} width="22px" height="22px" onClick={() => props.setOpen(false)} />
                    </button>
                </div>
            </header>
            <div className={classes.headerSpacer}></div>
            <div className={classes.properties}>
                {
                    component.properties.map((property: any) => {
                        return (
                            <div key={property.name} className={classes.modalField}>
                                <label className={classes.modalLabel} htmlFor={property.name}>{property.title}</label>
                                {loadInput(property)}
                            </div>)
                    })
                }
            </div>
        </div>
    </dialog>
  );
}

export default PropertiesModal;