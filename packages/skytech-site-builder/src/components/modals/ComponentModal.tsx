import { useEffect, useState } from "react";
import Close from "../../assets/icons8-close-30.png";
import classes from "../../styles/Modal.module.css";

/**
 * @name ComponentModal
 * @description a modal to display for users to pick a component
 * @param props
 * open => boolean value that handles displaying the modal
 * setOpen => function to set open boolean value
 * callback => callback function for when option is selected
 * @returns Component
 */
function ComponentModal(props: any) {
  const [groups, setGroups] = useState({} as any);

  /**
   * @name handleAndClose
   * @description handles closing modal and calling callback function with component name
   * @param name name of component selected
   */
  async function handleAndClose(name: string) {
    props.setOpen(false);
    await props.callback(name);
  }

  /**
   * handles getting all container and components with properties and
   * groups them into unique groups
   */
  useEffect(() => {
    window.fileOperations
      .getWebComponentProperties()
      .then((properties: any) => {
        const allComponents = [
          ...properties.components,
          ...properties.containers,
        ];
        const actualGroups: any = {};

        allComponents.forEach((item) => {
          if (!actualGroups[item.group]) {
            actualGroups[item.group] = {
              values: [],
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
          <button
            type="button"
            className={classes.modalBtn}
            onClick={() => props.setOpen(false)}
          >
            <img src={Close} width="20px" height="20px" />
          </button>
        </header>
        <div className={classes.headerSpacer}></div>
        <div className={classes.groups}>
          {Object.keys(groups).map((group: string) => (
            <>
              <div key={group} className={classes.group}>
                {group}
              </div>
              <div className={classes.components}>
                {groups[group].values.map((component: string) => (
                  <p
                    key={component}
                    className={classes.component}
                    onClick={async () => await handleAndClose(component)}
                    onKeyDown={async () => await handleAndClose(component)}
                  >
                    {component}
                  </p>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default ComponentModal;
