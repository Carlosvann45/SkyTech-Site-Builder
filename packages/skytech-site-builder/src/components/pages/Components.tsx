import classes from '../../styles/Components.module.css';
import Component from '../../assets/icons8-code-blocks-100.png';

function Components() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.components}>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Header</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Footer</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Text</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Image</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Heading</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>One Column Container</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Component} />
          <h4 className={classes.cardtitle}>Two Column Container</h4>
        </div>
      </div>
    </div>
  );
}

export default Components;