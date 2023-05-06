import * as fs from "fs";

import { createControllerImports } from "./imports";
import { createControllerConstructorParams } from "./constructor-params";
import { createControllerMethods } from "./methods";
import * as utils from "kunlatek-utils";

const controllerMain = (object, projectPath) => {
  const controllerName = object.id;

  let _imports = createControllerImports(object);
  let _constructorParams = createControllerConstructorParams(object);
  let _methods = createControllerMethods(object);
  let code = `
  ${_imports}

  export class ${utils.pascalfy(controllerName)}Controller {  
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
    const componentFilePath = `${projectPath}-api/src/controllers/api/${utils.kebabfy(object.id)}.controller.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/controllers/index.ts`;

    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFile(
      componentIndexFilePath, 
      `export * from './api/${utils.kebabfy(object.id)}.controller';`, () => { },
      { flag: 'w' }
    );
  
    console.info(`Controller ${utils.kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create controller ${utils.kebabfy(object.id)} error: ${err.message}`);
  }
};

export { controllerMain };
