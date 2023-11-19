import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ComponentEditor from "../editorTools/ComponentEditor";
import ContainerEditor from "../editorTools/ContainerEditor";
import Logo from "../../assets/skytech-site-builder-light.png";
import navClasses from "../../styles/Navigation.module.css";
import classes from "../../styles/Editor.module.css";
import Common from "../../utils/common";
import { ERROR } from "../../utils/constants";
import ContainerPreview from "../preview/ContainerPreview";

/**
 * @name Editor
 * @description handles loading editor for a page or a template
 * @returns Component
 */
function Editor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [edit, setEdit] = useState(true);
  const [pageData, setPageData] = useState({
    name: "Editor",
    type: "page",
    components: [],
  });
  const [components, setComponents] = useState([]);

  /**
   * @name formatComponentTag
   * @description handles formatting tage name from component
   * @param component component to create a tag
   * @returns react component
   */
  function formatComponentTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {};
    if (edit) {
      tags = {
        class: classes.editHover,
      };
    }

    for (const property of component.properties) {
      tags = {
        ...tags,
        [property.name]: property.value,
      };
    }

    nameArr.pop();

    return React.createElement(`${nameArr.join("-")}`, tags);
  }

  /**
   * @name formatContainerTag
   * @description handles formatting tage name from container
   * @param component container to create a tag
   * @returns react component
   */
  function formatContainerTag(component: any) {
    const nameArr = component.name.split("-");
    let tags = {};
    if (edit) {
      tags = {
        class: classes.editHover,
      };
    }

    for (const property of component.properties) {
      tags = {
        ...tags,
        [property.name]: property.value,
      };
    }

    for (const column of component.columns) {
      for (const property of column.properties) {
        tags = {
          ...tags,
          [property.name]: property.value,
        };
      }
    }

    nameArr.pop();

    return `${nameArr.join("-")}`;
  }

  /**
   * @name updateComponents
   * @description handles updating the components on the page
   * @param componentArr new component array
   */
  function updateComponents(componentArr: any) {
    const pathArr = location.pathname.split("/");

    if (pathArr.includes("template")) {
      const template = location.state.template ?? "";

      window.fileOperations
        .updateTemplateComponents(template, componentArr)
        .then((updated: boolean) => {
          if (updated) {
            setComponents(componentArr);
          } else {
            Common.toast("error", ERROR.COMPONENT_UPDATE_ERROR);
          }
        });
    } else {
      const page = location.state.page ?? "";
      const project = location.state.project ?? "";

      window.fileOperations
        .updatePageComponents(project, page, componentArr)
        .then((updated: boolean) => {
          if (updated) {
            setComponents(componentArr);
          } else {
            Common.toast("error", ERROR.COMPONENT_UPDATE_ERROR);
          }
        });
    }
  }

  /**
   * Handles loading the correct components for template and pages
   */
  useEffect(() => {
    const pathArr = location.pathname.split("/");

    if (pathArr.includes("template")) {
      const template = location.state.template ?? "";

      window.fileOperations.getTemplate(template).then((json: any) => {
        setPageData(json);
        setComponents(json.components);
      });
    } else {
      const page = location.state.page ?? "";
      const project = location.state.project ?? "";

      window.fileOperations.getPages(project).then((p: any) => {
        const newPageData = p.find((p: any) => p.name === page);

        setPageData(newPageData);
        setComponents(newPageData.components);
      });
    }
  }, []);

  return (
    <>
      <div className={navClasses.topbar}>
        <div className={navClasses.topcontainer}>
          <img
            style={{ width: "25px", height: "20px", margin: "5px" }}
            className={navClasses.hover}
            src={Logo}
            onClick={() => navigate("/websites")}
            onKeyDown={() => navigate("/websites")}
          />
        </div>
        <div className={navClasses.topcontainer}>
          <p className={navClasses.title}>
            {`${pageData?.type === "template" ? "Template: " : "Page: "}` +
              Common.formatTitle(pageData.name, true)}
          </p>
        </div>
        <div className={navClasses.switchcontainer}>
          <p className={navClasses.switchText}>Edit</p>
          <input
            type="checkbox"
            name="switch"
            id="switch"
            className={navClasses.input}
            onClick={() => setEdit(!edit)}
          />
          <label htmlFor="switch" className={navClasses.label}></label>
          <p style={{ marginRight: "8px" }} className={navClasses.switchText}>
            Preview
          </p>
        </div>
      </div>
      <div className={classes.maincontent}>
        {/* add side bar later*/}
        <div className={classes.pagecontainer}>
          {components.length > 0 &&
            components.map((c: any) => {
              if (edit) {
                if (c.type === "component") {
                  return (
                    <div className={classes.editHover} key={c.name}>
                      <ComponentEditor
                        componentName={c.name}
                        tag={formatComponentTag(c)}
                        component={c}
                        components={components}
                        setComponents={updateComponents}
                      />
                    </div>
                  );
                } else {
                  return (
                    <ContainerEditor
                      key={c.name}
                      tag={formatContainerTag(c)}
                      componentName={c.name}
                      component={c}
                      components={components}
                      setComponents={updateComponents}
                    />
                  );
                }
              } else if (c.type === "component") {
                return formatComponentTag(c);
              } else {
                return (
                  <ContainerPreview
                    key={c.name}
                    tag={formatContainerTag(c)}
                    component={c}
                  />
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

export default Editor;
