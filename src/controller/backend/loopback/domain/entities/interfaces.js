const {
  pascalfy
} = require("kunlatek-utils");
const { 
  getAllElements,
  booleanTypes,
  numberTypes,
  stringTypes,
} = require("../../../utils.backend");

/**
 * Return domain entity interface code
 * @param   {object}  object  Form object
 * @returns {string}          Domain entity interface code
 */
const createEntityInterfaces = (object) => {
  const modelName = object.id;

  let code = `
  export interface I${pascalfy(modelName)} {
    _id?: string
    _createdBy: string
    _ownerId: string
    ${createEntityProperties(object)}
  }
  `;

  return code;
};

/**
 * Return entity properties code
 * @param   {object}  object  Form object
 * @returns {string}          Entity properties code
 */
const createEntityProperties = (object) => {
  let code = ``;

  const elements = getAllElements(object.elements);

  elements.forEach((element) => {
    code += createPropertyByElement(element);
  });

  return code;
};

/**
 * Create property by element
 * @param   {object}  element Element to create property
 * @returns {string}          Property code
 */
const createPropertyByElement = (element) => {
  const type = element.dataType;

  let code = ``;

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

  code += `${element.name}${!element.isRequired ? '?' : ''}: ${propertyType};`;

  return code;
};

module.exports = {
  createEntityInterfaces
}