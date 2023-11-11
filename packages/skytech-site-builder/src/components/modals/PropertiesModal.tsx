import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Info from '../../assets/icons8-info-50.png';
import Close from '../../assets/icons8-close-30.png';
import Done from '../../assets/icons8-done-26.png';
import classes from '../../styles/Modal.module.css';
import { REGEX } from '../../utils/constants';

function PropertiesModal(props: any) {
  const [selected, setSelected] = useState('properties');
  const [changedProperties, setChangedProperties] = useState({} as any);
  const [component, setComponent] = useState({ title: '', properties: []} as any);


  const StyledToolTip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#212121c7',
      color: '#8C8C8C',
      fontSize: 15
    }
  }));

  function loadInput(property: any) {
    const props = {} as any
    
    if (property.type === 'textarea') {
        if (property.limit) {
            props['maxLength'] = property.limit;
        }

        return (
            <textarea name={property.name} 
                      className={classes.modalInput} 
                      onChange={(e: any) => handleOnChange(e, property)}
                      placeholder={property.example ?? ''}
                      value={changedProperties[property.name].value}
                      rows={4} cols={50}
                      {...props}></textarea>
        );
    } else if (property.type === 'option') {
        return (
            <select name={property.name} 
                    className={classes.modalInput}
                    onChange={(e: any) => handleOnChange(e, property)}
                    value={changedProperties[property.name].value}>
            {
                property.values.map((value: any) => (
                    <option key={value} value={value}>{value}</option>
                ))
            }
            </select>
            
        );
    } else {
        if (property.limit) {
            props['maxLength'] = property.limit;
        }

        return (<input type="text" 
                       name={property.name} 
                       className={classes.modalInput}
                       onChange={(e: any) => handleOnChange(e, property)}
                       placeholder={property.example ?? ''}
                       value={changedProperties[property.name].value}
                       {...props} />);
    }
  }

  function loadTab() {
    if (selected === 'properties') {
        return (
            component.properties.map((property: any) => {
                return (
                    <div key={property.name} className={classes.modalField}>
                        <div className={classes.labelWrapper}>
                            <label className={classes.modalLabel} htmlFor={property.name}>{property.title}</label>
                            {
                                property.info && (
                                    <StyledToolTip title={property.info} placement="right">
                                      <img className={classes.icon} src={Info} alt="name info tool tip" width={20} height={20}/>
                                    </StyledToolTip>
                                    )
                            }
                        </div>
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
                                <div className={classes.labelWrapper}>
                                    <label className={classes.modalLabel} htmlFor={property.name}>{property.title}</label>
                                    {
                                        property.info && (
                                            <StyledToolTip title={property.info} placement="right">
                                              <img className={classes.icon} src={Info} alt="name info tool tip" width={20} height={20}/>
                                            </StyledToolTip>
                                            )
                                    }
                                </div>
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
    let newProperties = changedProperties;
    console.log(newProperties)
    if (newProperties.regex && !incorrectInput(newProperties, target.value)) {
        newProperties = {
            ...newProperties,
            hasError: true
        }
    } else if (property.hasError) {
        delete newProperties.hasError
    }

    if (property.type === 'number') {
        const valid = REGEX.NUMBER.test(target.value);
        
        if (!valid) return;
    }

    newProperties = {
        ...newProperties,
        [property.name]: target.value
    }

    setChangedProperties(newProperties);
  }

  function incorrectInput(property: any, value: any) {
    const regex = new RegExp(property.regex);
    return regex.test(value);
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

    if (component?.columns) {
        const newColumns = [] as any;

        component.columns.forEach((column: any) => {
            const newColumnProperties = [] as any;

            column.properties.forEach((property: any) => {
                newColumnProperties.push({
                    ...property,
                    value: changedProperties[property.name]
                });
            });
            
            column.properties = newColumnProperties;

            newColumns.push(column);
        });

        finalComponent.columns = newColumns;
    }

    props.callback(finalComponent);
    props.setOpen(false)
  }

  useEffect(() => {
        if (props?.component?.title) {
            let newProperties = {};
            let regexProps = {}

            props.component.properties.forEach((property: any) => {
                if (property.regex) {
                    regexProps = {
                        regex: property.regex
                    }
                }
                newProperties = {
                    ...newProperties,
                    ...regexProps,
                    [property.name]: {
                        value: property?.value ?? ''
                    }
                }
            })
    
            setChangedProperties(newProperties);
            setComponent(props.component);
        }

        setSelected('properties');
  }, [props.component, props.open]);

  return (
    <dialog className={classes.showModal} open={props.open}>
        <div className={classes.properitesModal}>
            <header className={classes.modalHeader}>
                <h3 className={classes.modalTitle}>{component.title}</h3>
                <div className={classes.modalBtnContainer}>
                    <button type="button" className={classes.modalBtn}  onClick={() => props.setOpen(false)}>
                        <img src={Close} width="20px" height="20px" />
                    </button>
                    <button type="button" className={classes.modalBtn} onClick={() => submitChanges()}>
                        <img src={Done} width="22px" height="22px" />
                    </button>
                </div>
            </header>
            <div className={classes.headerSpacer}></div>
            <div className={classes.tabs}>
                <div className={`${classes.tabOption} ${selected === 'properties' ? classes.tabSelected : ''}`}
                     onClick={() => setSelected('properties')} onKeyDown={() => setSelected('properties')}>Properties</div>
                {
                    component?.columns?.length > 0 && component.columns.map((column: any) => (
                        column.properties.length > 0 && (
                        <div key={column.name} 
                             onClick={() => setSelected(column.name)}
                             onKeyDown={() => setSelected(column.name)}
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