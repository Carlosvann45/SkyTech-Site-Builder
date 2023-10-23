import { useEffect, useState } from 'react';
import Close from '../../assets/icons8-close-30.png';
import classes from '../../styles/Modal.module.css';

function ComponentModal(props: any) {
  const [groups, setGroups] = useState({} as any);

  function handleAndClose(name: string) {
    props.setOpen(false);
    props.callback(name);
  }

  useEffect(() => {
    window.fileOperations.getWebComponentProperties().then((properties: any) => {
        const allComponents = [...properties.components, ...properties.containers];
        let actualGroups: any = {};
        
        allComponents.forEach((item) => {
            if(!actualGroups[item.group]){
                actualGroups[item.group] = {
                    values: []
                };
            }
            
            actualGroups[item.group].values.push(item.title);
        });

        setGroups(actualGroups);
    });
  }, [props.open]);

  return (
    <dialog className={classes.showModal} open={props.open}>
        <div className={classes.modalContent}>
            <header className={classes.modalHeader}>
                <h3 className={classes.modalTitle}>Components</h3>
                <button type="button" className={classes.modalBtn}>
                    <img src={Close} width="20px" height="20px" onClick={() => props.setOpen(false)} />
                </button>
            </header>
            <div className={classes.headerSpacer}></div>
            <div className={classes.groups}>
                {
                    Object.keys(groups).map((group: string) => (
                        <>
                            <div key={group} className={classes.group}>{group}</div>
                            <div className={classes.components}>
                                {
                                    groups[group].values.map((component: string) => (
                                        <p key={component} className={classes.component} onClick={() => handleAndClose(component)}>{component}</p>
                                    ))
                                }
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    </dialog>
  );
}

export default ComponentModal;