const { setIdToClassName, pascalfy, singularize } = require("../../../../../../utils/text.transformation");
const { 
  getAllElements,
  booleanTypes, 
  numberTypes, 
  stringTypes,
} = require("../../../utils.backend");

const createRepositorySchemaProperties = (object, schemaName) => {

  let code = ``;

  const elements = getAllElements(object.elements);

  elements.forEach((element) => {
    code += createSchemaPropetyByElement(element, schemaName);
  });

  return code;
};

const createSchemaPropetyByElement = (element, schemaName) => {
  const type = element.dataType;

  let code = ``;

  const propertyType = element.isMultiple || type === 'array' || element.type === 'file' ?
    'string' :
    (
      stringTypes.includes(element.type || type) ? 'string' :
        (
          numberTypes.includes(element.type || type) ? 'number' :
            (
              booleanTypes.includes(element.type || type) ? 'boolean' : 'string'
            )
        )
    );

  if (element.optionsApi && element.optionsApi.endpoint) {
    const className = setIdToClassName(
      pascalfy(
        singularize(element.optionsApi.endpoint.split('-').join(' '))
      )
    );

    if (element.isMultiple) {
      code += `
        ${element.name}: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: '${className}',
            model: { _id: { type: 'string' } }
          }
        ],
      `;
    } else {
      code += `
        ${element.name}: {
          type: mongoose.Schema.Types.ObjectId,
          ref: '${className}', 
          required: ${element.isRequired || false},
          model: { _id: { type: 'string' } },
          ${!element.isRequired ? 'default: null,' : ''}
        },
      `;
    }
  } else if (type === 'array') {
    code += `${element.name ?? element.id}: [{ type: 'any' }],`;
  } else {
    code += `
      ${element.name ?? element.id}: {
        type: '${propertyType}', // ${element.isUnique ? `validate: [unique('${schemaName}', '${element.name ?? element.id}'), '${element.name ?? element.id} is unique'],` : ``}
        required: ${element.isRequired || false},
        ${!element.isRequired ? 'default: null,' : ''}
      },
    `;
  }

  return code;
};

module.exports = {
  createRepositorySchemaProperties
}