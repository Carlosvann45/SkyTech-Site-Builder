import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../../styles/Templates.module.css';
import Template from '../../assets/icons8-template-100.png';
import Common from '../../utils/common';

function Templates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([] as any);

  useEffect(() => {
    window.fileOperations.getTemplates().then((templateArr: any) => {
      setTemplates(templateArr);
    })
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.templates}>
        {
          templates.length > 0 && templates.map((template: any) => (
            <div key={template.name} className={classes.card} onClick={() => navigate(`/editor/template/${template.name}`)}>
              <img className={classes.cardicon} src={Template} />
              <h4 className={classes.cardtitle}>{Common.formatTitle(template.title, true)}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Templates;