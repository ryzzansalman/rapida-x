const fs = require("fs");
const {
  pascalfy,
  kebabfy,
} = require("kunlatek-utils");
const { createRepositorySchemaProperties } = require("./properties");

const repositorySchemaMain = (object, projectPath) => {
  const schemaName = object.id;
  const modelName = pascalfy(schemaName);

  let _properties = createRepositorySchemaProperties(object, pascalfy(schemaName));

  let code = `
  import mongoose from 'mongoose';
  import {transformSchemaToMongooseModel} from '../../../../utils/general.util';

  export const ${schemaName}Schema = {

    _createdBy: { type: 'string', required: false, default: '' },
    _ownerId: { type: 'string', required: false, default: '' },
    ${_properties}

  };

  const ${modelName}MongoSchema = new mongoose.Schema(
    transformSchemaToMongooseModel(${schemaName}Schema),
    {
      timestamps: {
        createdAt: '_createdAt',
        updatedAt: '_updatedAt',
      }
    }
  )
  export const ${modelName}MongoModel = mongoose.model('${modelName}', ${modelName}MongoSchema, '${modelName}');
  `;

  setRepositorySchemaArchitectureAndWriteToFile(object, code, projectPath);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param   {object}  object        Form object
 * @param   {string}  code          Domain entity code 
 * @param   {string}  projectPath   Project file path
 * @returns {void}
 */
const setRepositorySchemaArchitectureAndWriteToFile = (object, code, projectPath) => {
  try {
    const componentFilePath = `${projectPath}-api/src/repositories/mongo/api/schemas/${kebabfy(object.id)}.schema.ts`;
    
    fs.writeFileSync(
      componentFilePath, 
      code, 
      { flag: 'w' },
    );

    console.info(`Mongoose schema ${kebabfy(object.id)} created successfully.`);
  } catch (err) {
    console.error(`Create mongoose schema ${kebabfy(object.id)} error: ${err.message}`);
  }
};

export { repositorySchemaMain };
