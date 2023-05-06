const fs = require("fs");
const { 
  pascalfy,
  kebabfy,
} = require("kunlatek-utils");
const { createConstructor } = require("./constructor");
const { createEntityInterfaces } = require("./interfaces");
const { createEntityProperties } = require("./properties");

const entityMain = (object, projectPath) => {
  const entityName = object.id;

  let _interface = createEntityInterfaces(object);
  let _properties = createEntityProperties(object);
  let _constructorParams = createConstructor(object);

  let code = `
  ${_interface}

  export class ${pascalfy(entityName)} {  

    ${_properties}

    constructor(entity: I${pascalfy(entityName)}){
      ${_constructorParams}
    }
  }
  `;

  setDomainEntityArchitectureAndWriteToFile(object, code, projectPath);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param   {object}  object        Form object
 * @param   {string}  code          Domain entity code 
 * @param   {string}  projectPath   Project file path
 * @returns {void}
 */
const setDomainEntityArchitectureAndWriteToFile = (object, code, projectPath) => {
  try {
    const componentFilePath = `${projectPath}-api/src/domain/entities/api/${kebabfy(object.id)}.model.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/domain/entities/api/index.ts`;
  
    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFile(
      componentIndexFilePath, 
      `export * from './${kebabfy(object.id)}.model';`, () => { },
      { flag: 'w' }
    );
  
    console.info(`Domain entity ${kebabfy(object.id)} created successfully.`);
  } catch(err) {
    console.error(`Create domain entity ${kebabfy(object.id)} error: ${err.message}`);
  }
};

module.exports = {
  entityMain
}