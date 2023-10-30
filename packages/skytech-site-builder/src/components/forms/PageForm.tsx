import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Validation from '../../utils/validation';
import Common from '../../utils/common';
import classes from '../../styles/Form.module.css';
import { ERROR } from '../../utils/constants';

function PageForm() {
  const navigate = useNavigate();
  const location =useLocation();
  const [directory, setDirectory] = useState('');
  const [page, setPage] = useState({ title: '' });

  function handleClick() {
    const result = Validation.verifyTitle(page);

    if (result.valid) {
      let newTitle = Common.formatTitle(page.title, false);

      window.fileOperations.createPage(directory, newTitle).then((created: any) => {
          if (!created) {
            Common.toast('error', ERROR.TITLE_EXISTS);
          } else {
            navigate('/websites/pages', {
                state: {
                    project: directory
                }
            });
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

    setPage({ 
      ...page,
      [input.id]: input.value
     })
  }

  useEffect(() => {
    const pathArr = window.location.pathname.split('/');
    const project = pathArr[pathArr.length - 1];

    setDirectory(project);
  }, [location])

  return (
    <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Page</h2>
        <div className={classes.form}>
            <p className={classes.inputcontainer}>
                <label className={classes.label} htmlFor="title">Title*</label>
                <input className={classes.input} onChange={onChange} type="text" name="title" id="title" />
            </p>
            <button className={classes.confirmbtn} onClick={handleClick} type="button">Create Page</button>
        </div>
    </div>
  );
}

export default PageForm;