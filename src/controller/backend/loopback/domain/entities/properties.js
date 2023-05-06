const { 
  getAllElements,
  booleanTypes, 
  numberTypes, 
  stringTypes
} = require("../../../utils.backend");

const createEntityProperties = (object) => {
  let code = `
    public _id?: string;
    public _createdBy: string;
    public _ownerId: string;
  `;

  const elements = getAllElements(object.elements);

  elements.forEach((element) => {
    code += createPropertiesByElement(element);
  });

  return code;
};

const createPropertiesByElement = (element) => {
  const type = element.dataType;

  const propertyType = element.isMultiple || type === 'array' || type === 'file' ?
    'any[]' :
    (
      stringTypes.includes(type) ? 'string' :
        (
          numberTypes.includes(type) ? 'number' :
            (
              booleanTypes.includes(type) ? 'boolean' : 'any'
            )
        )
    );

  code += `public ${element.name}${!element.isRequired ? '?' : ''}: ${propertyType};`;

  return code;
};

module.exports = {
  createEntityProperties
}