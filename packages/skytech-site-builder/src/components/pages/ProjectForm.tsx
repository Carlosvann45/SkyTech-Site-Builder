import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../utils/validation';
import Common from '../../utils/common';
import classes from '../../styles/Form.module.css';
import { ERROR } from '../../utils/constants';

function ProjectForm() {
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '' });

  function handleClick() {
    const result = Validation.verifyTitle(project);

    if (result.valid) {
      let newTitle = Common.formatTitle(project.title, false);

      window.fileOperations.createDirectory(newTitle).then((created: any) => {
        if (!created) {
          Common.toast('error', ERROR.TITLE_EXISTS);
        } else {
          navigate('/websites');
        }
      });
    } else {
      result.messages.forEach(message => {
        Common.toast('error', message);
      })
    }
  }

  function onChange(e: any) {
    const input = e.target;

    setProject({ 
      ...project,
      [input.id]: input.value
     })
  }

  return (
    <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Folder</h2>
        <div className={classes.form}>
            <p className={classes.inputcontainer}>
                <label className={classes.label} htmlFor="title">Title*</label>
                <input className={classes.input} onChange={onChange} type="text" name="title" id="title" />
            </p>
            <button className={classes.confirmbtn} onClick={handleClick} type="button">Create Folder</button>
        </div>
    </div>
  );
}

export default ProjectForm;