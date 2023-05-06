import * as fs from "fs";

import { createControllerImports } from "./imports";
import { createControllerConstructorParams } from "./constructor-params";
import { createControllerMethods } from "./methods";
import { TextTransformation } from "kunlatek-utils";

const controllerMain = (object, projectPath) => {
  const controllerName = object.id;

  let _imports = createControllerImports(object);
  let _constructorParams = createControllerConstructorParams(object);
  let _methods = createControllerMethods(object);
  let code = `
  ${_imports}

  export class ${TextTransformation.pascalfy(controllerName)}Controller {  
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
    const componentFilePath = `${projectPath}-api/src/controllers/api/${TextTransformation.kebabfy(object.id)}.controller.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/controllers/index.ts`;

    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFile(
      componentIndexFilePath, 
      `export * from './api/${TextTransformation.kebabfy(object.id)}.controller';`, () => { },
      { flag: 'w' }
    );
  
    console.info(`Controller ${TextTransformation.kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create controller ${TextTransformation.kebabfy(object.id)} error: ${err.message}`);
  }
};

export { controllerMain };
