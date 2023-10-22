import { useState } from 'react';
import Edit from '../../assets/icons8-edit-24.png';
import Plus from '../../assets/icons8-plus-24.png';
import Trash from '../../assets/icons8-trash-30.png';
import classes from '../../styles/EditorTools.module.css';

function ContainerEditor(props: any) {
  const [clicked, setClicked] = useState(false);
  const { component, editCallback, addCallback, trashCallback }: any = props;
  const containerAmount = component.columns.length;


  return (
    <div tabIndex={0} onFocus={() => setClicked(true)}>
        <button className={clicked ? classes.iconBtnFirst : classes.hideIconBtn} onClick={() => editCallback()}>
            <img src={Edit} width="15px" height="15px" />
        </button>
        <button className={clicked ? classes.iconBtn : classes.hideIconBtn} onClick={() => addCallback()}>
            <img src={Plus} width="15px" height="15px" />
        </button>
        <button className={clicked ? classes.iconBtnLast : classes.hideIconBtn} onClick={() => trashCallback()}>
            <img src={Trash} width="15px" height="15px" />
        </button>
        <div className={clicked ? classes.wrapper : ''}>
            {component}
        </div>
    </ div>
  );
}

export default ContainerEditor;