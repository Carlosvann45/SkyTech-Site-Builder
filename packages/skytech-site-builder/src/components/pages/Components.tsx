import { useEffect, useState } from "react";
import classes from "../../styles/Components.module.css";
import Component from "../../assets/icons8-code-blocks-100.png";

/**
 * @name Components
 * @description handles displaying all available components
 * @returns Component
 */
function Components() {
  const [components, setComponents] = useState([] as any);

  /**
   * Handles getting all components and containers to display
   */
  useEffect(() => {
    window.fileOperations
      .getWebComponentProperties()
      .then((properties: any) => {
        setComponents([...properties.components, ...properties.containers]);
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.components}>
        {components.length > 0 &&
          components.map((item: any) => (
            <div key={item.name} className={classes.card}>
              <img className={classes.cardicon} src={Component} />
              <h4 className={classes.cardtitle}>{item.title}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Components;
