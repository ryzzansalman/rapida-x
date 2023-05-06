const fs = require("fs");
const { 
  pascalfy,
  kebabfy,
} = require("kunlatek-utils");

const domainRepositoryMain = (object, projectPath) => {
  const entityName = object.id;
  const modelName = pascalfy(entityName);

  let code = `
  import {${modelName}, I${modelName}} from '../../entities'
  
  export interface I${modelName}Repository {
    create(data: I${modelName}): Promise<${modelName}>
    findAll(filters: any, limit: number, page: number): Promise<${modelName}[]>
    findById(id: string): Promise<${modelName}>
    updateById(id: string, dataToUpdate: Partial<I${modelName}>): Promise<${modelName}>
    replaceById(id: string, dataToUpdate: I${modelName}): Promise<${modelName}>
    deleteById(id: string): Promise<void>
  }
  `;

  setDomainRepositoryArchitectureAndWriteToFile(object, code, projectPath);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param   {object}  object        Form object
 * @param   {string}  code          Domain entity code 
 * @param   {string}  projectPath   Project file path
 * @returns {void}
 */
const setDomainRepositoryArchitectureAndWriteToFile = (object, code, projectPath) => {
  try {
    const componentFilePath = `${projectPath}-api/src/domain/repositories/api/${kebabfy(object.id)}.repository.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/domain/repositories/api/index.ts`;

    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFile(
      componentIndexFilePath, 
      `export * from './${kebabfy(object.id)}.model';`, (err) => { },
      { flag: 'w' }
    );
  
    console.info(`Domain repository ${kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create domain repository ${kebabfy(object.id)} error: ${err.message}`);
  }
};

export { domainRepositoryMain };
