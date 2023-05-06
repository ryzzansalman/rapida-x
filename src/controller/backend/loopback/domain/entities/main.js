import * as fs from "fs";
import { TextTransformation } from "../../../../../../utils/text.transformation";
import { createConstructor } from "./constructor";
import { createEntityInterfaces } from "./interfaces";
import { createEntityProperties } from "./properties";

const entityMain = (object, projectPath) => {
  const entityName = object.id;

  let _interface = createEntityInterfaces(object);
  let _properties = createEntityProperties(object);
  let _constructorParams = createConstructor(object);

  let code = `
  ${_interface}

  export class ${TextTransformation.pascalfy(entityName)} {  

    ${_properties}

    constructor(entity: I${TextTransformation.pascalfy(entityName)}){
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
    const componentFilePath = `${projectPath}-api/src/domain/entities/api/${TextTransformation.kebabfy(object.id)}.model.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/domain/entities/api/index.ts`;
  
    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFile(
      componentIndexFilePath, 
      `export * from './${TextTransformation.kebabfy(object.id)}.model';`, () => { },
      { flag: 'w' }
    );
  
    console.info(`Domain entity ${TextTransformation.kebabfy(object.id)} created successfully.`);
  } catch(err) {
    console.error(`Create domain entity ${TextTransformation.kebabfy(object.id)} error: ${err.message}`);
  }
};

export { entityMain };
