import classes from '../../styles/Templates.module.css';
import Template from '../../assets/icons8-template-100.png';

function Templates() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.templates}>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Template} />
          <h4 className={classes.cardtitle}>Base Template</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Template} />
          <h4 className={classes.cardtitle}>Header Template</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Template} />
          <h4 className={classes.cardtitle}>Footer Template</h4>
        </div>
        <div className={classes.card}>
          <img className={classes.cardicon} src={Template} />
          <h4 className={classes.cardtitle}>Header/Footer Template</h4>
        </div>
      </div>
    </div>
  );
}

export default Templates;