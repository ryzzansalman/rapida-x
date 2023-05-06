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
    // TODO: relation schema properties
    // const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));

    // if (value.isMultiple) {
    //   code += `
    //     ${value.name}: [
    //       {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: '${className}', ${value.isUnique ? `unique: true,` : ``}
    //       }
    //     ],
    //   `;
    // } else {
    //   code += `
    //     ${value.name}: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: '${className}', ${value.isUnique ? `unique: true,` : ``}
    //       required: ${value.isRequired || false},
    //       ${!value.isRequired ? 'default: null,' : ''}
    //     },
    //   `;
    // }
  } else if (type === 'array') {
    code += `${element.name}: [{ type: 'any' }],`;
  } else {
    code += `
      ${element.name}: {
        type: '${propertyType}', // ${element.isUnique ? `validate: [unique('${schemaName}', '${element.name}'), '${element.name} is unique'],` : ``}
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