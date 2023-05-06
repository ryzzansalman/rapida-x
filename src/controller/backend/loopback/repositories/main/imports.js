const { 
    pascalfy,
    kebabfy,
} = require("kunlatek-utils");

const createRepositoryImports = (object) => {

    const entityName = object.id;
    const modelName = pascalfy(entityName);

    let code = `
    import {HttpErrors} from '@loopback/rest';
    import mongoose from 'mongoose';
    import {${modelName}, I${modelName}} from '../../../domain/entities';
    import {I${modelName}Repository} from '../../../domain/repositories';
    import {${modelName}MongoModel} from './schemas/${kebabfy(entityName)}.schema';
    `;

    return code;
};

module.exports = {
    createRepositoryImports
}