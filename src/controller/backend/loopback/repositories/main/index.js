const fs = require("fs");
const { 
  pascalfy,
  kebabfy,
} = require('../../../../../../utils/text.transformation');
const { createRepositoryImports } = require("./imports");
const { setSeedModules } = require("./modules");
const { getRelatedProperties } = require("./related-properties");

const repositoryMain = (object, projectPath) => {
  const entityName = object.id;
  const modelName = pascalfy(entityName);

  const _imports = createRepositoryImports(object);
  const _relatedProperties = getRelatedProperties(object);

  let code = `
  ${_imports}

  if(mongoose.connection.readyState === 0){
    mongoose.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/kunlatek',
      { dbName: process.env.DB! }
    ).then(() => console.log('Mongoose: Connected to db!!'))
  }

  export class ${modelName}Repository implements I${modelName}Repository {
    async create(data: I${modelName}): Promise<${modelName}> {
      const dataCreated = await ${modelName}MongoModel.create(data);
      return new ${modelName}(dataCreated);
    }

    async findAll(filters: any, limit: number, page: number): Promise<${modelName}[]> {
      return (await ${modelName}MongoModel
        .find(filters)
        ${_relatedProperties}
        .skip(page * limit)
        .limit(limit)
      ).map((data: any) => new ${modelName}(data));
    }

    async findById(id: string): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findById(id)
        ${_relatedProperties}
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async updateById(id: string, dataToUpdate: Partial<I${modelName}>): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findByIdAndUpdate(id, dataToUpdate, {new: true})
        ${_relatedProperties}
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async replaceById(id: string, dataToUpdate: I${modelName}): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findOneAndReplace({_id: id}, dataToUpdate, {new: true})
        ${_relatedProperties}
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async deleteById(id: string): Promise<void> {
      await ${modelName}MongoModel.findByIdAndDelete(id);
    }
  }
  `;

  setDomainEntityArchitectureAndWriteToFile(object, code, projectPath);

  setSeedModules(object, projectPath);

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
    const componentFilePath = `${projectPath}-api/src/repositories/mongo/api/${kebabfy(object.id)}.repository.ts`;
    const componentIndexFilePath = `${projectPath}-api/src/repositories/index.ts`;

    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );
  
    fs.appendFileSync(
      componentIndexFilePath, 
      `export * from './mongo/api/${kebabfy(object.id)}.repository';`,
    );
  
    console.info(`Repository ${kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create repository ${kebabfy(object.id)} error: ${err.message}`);
  }
};

module.exports = { 
  repositoryMain,
};
