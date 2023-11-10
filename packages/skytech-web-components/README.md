# Sky Tech Web Components


## Description
This repo is a set of common web components that allow dynamic change of the styling to to use in SkyTech Site Builder. Each component has a set of properties that interface with the site builders dynamic modal to help support a no code solution. Below you will find documentation on the propertes and how they are implemented. There are only two types of components Components and Containers. Each type has unique properties and will be explained below. 


## Component Properties
Below you will see an example object of a Component properties JSON along with documentation related to what each property is and what it is used for.

```
{
    "title": "",
    "name": "",
    "group": "",
    "type": "",
    "properties": []
}
```

**title** - The title of the component. <br />
**name** - The tag name of the Lit component. <br />
**group** - The group the componenet should show up in. <br />
**type** - Wether it is a container or component. <br />
**properties** - An array of attributes that can be used on the componenet. More about this below. 


### Propeties Array
There are four types of properties objects text, textarea, number, and option. Each has its own set of properties and you can see examples and definitions of the below. Unless otherwise stated all fields are required.


#### Text Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "text",
    "regex": "",
    "error": "",
    "limit": 255
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**regex** - regex to validate text input. (optional) <br /> 
**error** - error message for regex validation. (optional but required if using regex) <br /> 
**limit** - character limit for text input. (optional) <br /> 


#### Text Area Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "textarea",
    "limit": 255
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**limit** - character limit for text input. (optional) <br /> 


#### Number Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "number",
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />


#### Option Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "type": "option",
    "values": [""]
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**values** - A string array of values to display. First option will be the default option in the array. <br />


## Container Properties
Below you will see an example object of a Container properties JSON along with documentation related to what each property is and what it is used for.

```
{
    "title": "",
    "name": "",
    "group": "",
    "type": "",
    "columns": []
    "properties": []
}
```

**title** - The title of the component. <br />
**name** - The tag name of the Lit component. <br />
**group** - The group the componenet should show up in. <br />
**type** - Wether it is a container or component. <br />
**properties** - An array of attributes that can be used on the componenet. More about this below. 


### Columns Array
Each object is a new column with its own properties array. Each new column will map to a slot in the Lit component. for more information about slots see [lit-element docs.](https://lit-element.readthedocs.io/en/v0.6.4/docs/templates/slots/) Below you will see a more detailed explanation of each property.


#### Column Object
```
{
    "title": "SkyTech Column One",
    "name": "skytech-column-one",
    "properties": []
}
```

**title** - The title of the component. <br />
**name** - The tag name of the Lit component. <br />
**properties** - The attributes related to each individual column. For more see Properties Array section below.


### Propeties Array
There are four types of properties objects text, textarea, number, and option. Each has its own set of properties and you can see examples and definitions of the below. Unless otherwise stated all fields are required.


#### Text Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "text",
    "regex": "",
    "limit": 255
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**regex** - regex to validate text input. (optional) <br /> 
**error** - error message for regex validation. (optional but required if using regex) <br /> 
**limit** - character limit for text input. (optional) <br /> 


#### Text Area Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "textarea",
    "limit": 255
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**limit** - character limit for text input. (optional) <br /> 


#### Number Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "example": "",
    "type": "number",
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**example** - Example of what attribute is for to display as a placeholder. (optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />


#### Option Object
```
{
    "title": "",
    "name": "",
    "info": "",
    "type": "option",
    "values": [""]
}
```

**title** - The title to display to a user. <br />
**name** - The name of the attribute to display on the component. <br />
**info** - Info about what the attribute is for to display to a user. (displays a tool tip and is optional) <br />
**type** - Wether the propertie is a text, textarea, number, or option. <br />
**values** - A string array of values to display. First option will be the default option in the array. <br />

## Examples

### Component Example
Below is an example using the SkyTech Text Component

```
{
    "title": "SkyTech Text",
    "name": "skytech-text",
    "group": "SkyTech Components",
    "type": "component",
    "properties": [
        {
            "title": "Content",
            "name": "content",
            "type": "textarea",
            "info": "Text for inside content.",
            "limit": 255
        },
        {
            "title": "Color",
            "name": "color",
            "type": "text",
            "regex": "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[A-Za-z]{3,}$|^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\\([^\\)]*\\)$/",
            "error": "Color must be valid color value, rgb value, rgba value, or hsla value.",
            "info": "Color of content."
        },
        {
            "title": "Font Size",
            "name": "fontSize",
            "type": "text",
            "regex": "/^\\d+(([p][x])|([e][m])|([r][e][m]))$/",
            "error": "Font Size must be in pixels, ems, or rems.",
            "info": "Size of text in pixels, em, or rem.",
            "example": "10px"
        },
        {
            "title": "Padding",
            "name": "padding",
            "type": "text",
            "info": "Internal space around text in pixels, em, or rem. Goes in order of top, right, bottom, left or top and bottom, left and right.",
            "example": "10px 10px 10px 10px"
        },
        {
            "title": "Margin",
            "name": "margin",
            "type": "text",
            "info": "External space around text. Goes in order of top, right, bottom, left or top and bottom, left and right.",
            "example": "10px"
        },
        {
            "title": "Text Align",
            "name": "textAlign",
            "type": "option",
            "info": "Aligns text left, right, or center",
            "values": [
                "left",
                "right",
                "center"
            ]
        },
        {
            "title": "Width",
            "name": "width",
            "type": "text",
            "info": "Width of text in percentages, pixels, em, or rem.",
            "example": "10px"
        },
        {
            "title": "Height",
            "name": "height",
            "type": "text",
            "info": "Height of text in percentages, pixels, em, or rem.",
            "example": "10px"
        },
        {
            "title": "Line Height",
            "name": "lineHeight",
            "type": "text",
            "regex": "/^\\d+(([p][x])|([e][m])|([r][e][m]))$/",
            "error": "Line Height must be in pixels, ems, or rems.",
            "info": "Line height of text in pixels, em, or rem.",
            "example": "10px"
        }
    ]
}
```


#### Use Case
```
<skytech-text slot="skytech-column-one" content="test content" fontSize="50px" color="#ae456b" textAlign="right" margin="25px"></skytech-text>
```


### Container Example
Below is an example using the SkyTech Two Column Container

```
{
    "title": "SkyTech Two Column",
    "name": "skytech-two-column",
    "group": "SkyTech Container",
    "type": "container",
    "columns": [
        {
            "title": "SkyTech Column One",
            "name": "skytech-column-one",
            "properties": [
                {
                    "title": "Color",
                    "name": "colorOne",
                    "type": "text",
                    "regex": "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[A-Za-z]{3,}$|^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\\([^\\)]*\\)$/",
                    "error": "Color must be valid color value, rgb value, rgba value, or hsla value.",
                    "info": "Background color of container."
                },
                {
                    "title": "Padding",
                    "name": "paddingOne",
                    "type": "text",
                    "info": "Internal space around container in pixels, em, or rem. Goes in order of top, right, bottom, left or top and bottom, left and right.",
                    "example": "10rem 10rem 10rem 10rem"
                },
                {
                    "title": "Margin",
                    "name": "marginOne",
                    "type": "text",
                    "info": "External space around container in pixels, ems, or rems. Goes in order of top, right, bottom, left or top and bottom, left and right.",
                    "example": "10em"
                },
                {
                    "title": "Width",
                    "name": "widthOne",
                    "type": "text",
                    "info": "Width of container in percentages, pixels, em, or rem.",
                    "example": "10px"
                },
                {
                    "title": "Height",
                    "name": "heightOne",
                    "type": "text",
                    "info": "Height of container in percentages, pixels, em, or rem.",
                    "example": "10px"
                }
            ]
        },
        {
            "title": "SkyTech Column Two",
            "name": "skytech-column-two",
            "properties": [
                {
                    "title": "Color",
                    "name": "colorTwo",
                    "type": "text",
                    "regex": "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[A-Za-z]{3,}$|^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\\([^\\)]*\\)$/",
                    "error": "Color must be valid color value, rgb value, rgba value, or hsla value.",
                    "info": "Background color of container."
                },
                {
                    "title": "Padding",
                    "name": "paddingTwo",
                    "type": "text",
                    "info": "Internal space around container in pixels, em, or rem. Goes in order of top, right, bottom, left or top and bottom, left and right.",
                    "example": "10rem 10rem 10rem 10rem"
                },
                {
                    "title": "Margin",
                    "name": "marginTwo",
                    "type": "text",
                    "info": "External space around container in pixels, ems, or rems. Goes in order of top, right, bottom, left or top and bottom, left and right.",
                    "example": "10em"
                },
                {
                    "title": "Width",
                    "name": "widthTwo",
                    "type": "text",
                    "info": "Width of container in percentages, pixels, em, or rem.",
                    "example": "10px"
                },
                {
                    "title": "Height",
                    "name": "heightTwo",
                    "type": "text",
                    "info": "Height of container in percentages, pixels, em, or rem.",
                    "example": "10px"
                }
            ]
        }
    ],
    "properties": [
        {
            "title": "Color",
            "name": "color",
            "type": "text",
            "regex": "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[A-Za-z]{3,}$|^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\\([^\\)]*\\)$/",
            "error": "Color must be valid color value, rgb value, rgba value, or hsla value.",
            "info": "Background color of container."
        },
        {
            "title": "Padding",
            "name": "padding",
            "type": "text",
            "info": "Internal space around container in pixels, em, or rem. Goes in order of top, right, bottom, left or top and bottom, left and right.",
            "example": "10rem 10rem 10rem 10rem"
        },
        {
            "title": "Margin",
            "name": "margin",
            "type": "text",
            "info": "External space around container in pixels, ems, or rems. Goes in order of top, right, bottom, left or top and bottom, left and right.",
            "example": "10em"
        },
        {
            "title": "Width",
            "name": "width",
            "type": "text",
            "info": "Width of container in percentages, pixels, em, or rem.",
            "example": "10px"
        },
        {
            "title": "Height",
            "name": "height",
            "type": "text",
            "info": "Height of container in percentages, pixels, em, or rem.",
            "example": "10px"
        }
    ]
}
```


#### Use Case
```
<skytech-two-column width="75%" margin="0px auto" color="#fff" colorOne="black" marginOne="5px" colorTwo="blue" marginTwo="5px">
  <skytech-text slot="skytech-column-one" content="test content" fontSize="50px" color="#ae456b" textAlign="right" margin="25px"></skytech-text>
  <skytech-heading slot="skytech-column-two" heading=2 content="test content" fontSize="50px" color="#ae456b" textAlign="left" margin="25px" fontWeight="600"></skytech-heading>
</skytech-two-column>
```