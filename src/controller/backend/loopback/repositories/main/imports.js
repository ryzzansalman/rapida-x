import { TextTransformation } from "../../../../../../utils/text.transformation";

export const createRepositoryImports = (object) => {

    const entityName = object.id;
    const modelName = TextTransformation.pascalfy(entityName);

    let code = `
    import {HttpErrors} from '@loopback/rest';
    import mongoose from 'mongoose';
    import {${modelName}, I${modelName}} from '../../../domain/entities';
    import {I${modelName}Repository} from '../../../domain/repositories';
    import {${modelName}MongoModel} from './schemas/${TextTransformation.kebabfy(entityName)}.schema';
    `;

    return code;
};
