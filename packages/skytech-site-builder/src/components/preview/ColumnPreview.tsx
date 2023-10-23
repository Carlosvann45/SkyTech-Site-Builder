import React from 'react';
import ContainerPreview from './ContainerPreview';

function ColumnPreview(props: any) {

    function formatComponentTag(component: any) {
        let nameArr = component.name.split('-');
        let tags = {};
    
        for (const property of component.properties) {
            tags = {
                ...tags,
                [property.name]: property.value
            };
        }
    
        nameArr.pop();
    
        return React.createElement(`${nameArr.join('-')}`, tags);
      }
    
      function formatContainerTag(component: any) {
        let nameArr = component.name.split('-');
        let tags = {};
    
        for (const property of component.properties) {
            tags = {
                ...tags,
                [property.name]: property.value
            };
        }
    
        for (const column of component.columns) {
            for (const property of column.properties) {
                tags = {
                    ...tags,
                    [property.name]: property.value
                };
            }
        }
    
        nameArr.pop();
    
        return `${nameArr.join('-')}`;
      }

  return (
    <div slot={props.column.name}>
        {
            props.column.components.map((c: any) => {
                if (c.type === 'component') {
                    return formatComponentTag(c);
                } else {
                    return <ContainerPreview
                                key={c.name}
                                tag={formatContainerTag(c)}
                                component={c} />
                }
            })
        }
    </ div>
  );
  }
  
  export default ColumnPreview;