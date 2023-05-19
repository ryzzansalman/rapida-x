const fs = require("fs");

const { createControllerImports } = require("./imports");
const { createControllerConstructorParams } = require("./constructor-params");
const { createControllerMethods } = require("./methods");
const { 
  pascalfy,
  kebabfy
} = require("../../../../../utils/text.transformation");

const controllerMain = (object, projectPath) => {
  const controllerName = object.id;

  let _imports = createControllerImports(object);
  let _constructorParams = createControllerConstructorParams(object);
  let _methods = createControllerMethods(object);
  let code = `
  ${_imports}

  export class ${pascalfy(controllerName)}Controller {  
    constructor(
      ${_constructorParams}
    ) { }
    
    ${_methods}
  }
  `;

  setControllerArchitectureAndWriteToFile(object, code, projectPath);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param   {object}  object        Form object
 * @param   {string}  code          Domain entity code 
 * @param   {string}  projectPath   Project file path
 * @returns {void}
 */
const setControllerArchitectureAndWriteToFile = (object, code, projectPath) => {
  try {
    const componentFilePath = `${projectPath}-api/src/controllers/api/${kebabfy(object.id)}.controller.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/controllers/index.ts`;

    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFileSync(
      componentIndexFilePath, 
      `export * from './api/${kebabfy(object.id)}.controller';`,
    );
  
    console.info(`Controller ${kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create controller ${kebabfy(object.id)} error: ${err.message}`);
  }
};

module.exports = { 
  controllerMain 
};
