import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../utils/validation';
import Common from '../../utils/common';
import classes from '../../styles/Form.module.css';
import { ERROR } from '../../utils/constants';

function TemplateForm() {
  const navigate = useNavigate();
  const [template, setTemplate] = useState({ title: '' });

  function handleClick() {
    const result = Validation.verifyTitle(template);

    if (result.valid) {
    //   let newTitle = Common.formatTitle(template.title, false);

    //   window.fileOperations.createProject(newTitle).then((created: any) => {
    //     if (!created) {
    //       Common.toast('error', ERROR.TITLE_EXISTS);
    //     } else {
    //       navigate('/websites/templates');
    //     }
    //   });
    } else {
      result.messages.forEach(message => {
        Common.toast('error', message);
      })
    }
  }

  function onChange(e: any) {
    const input = e.target;

    setTemplate({ 
      ...template,
      [input.id]: input.value
     })
  }

  return (
    <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Template</h2>
        <div className={classes.form}>
            <p className={classes.inputcontainer}>
                <label className={classes.label} htmlFor="title">Title*</label>
                <input className={classes.input} onChange={onChange} type="text" name="title" id="title" />
            </p>
            <button className={classes.confirmbtn} onClick={handleClick} type="button">Create Template</button>
        </div>
    </div>
  );
}

export default TemplateForm;