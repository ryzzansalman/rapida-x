const { 
  pascalfy,
  kebabfy
} = require("../../../../../utils/text.transformation");

const createControllerImports = (object) => {
  const entityName = object.id;
  const modelName = pascalfy(entityName);

  let code = `
  import {authenticate} from '@loopback/authentication';
  import {inject} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {Request, Response, RestBindings, api, del, get, param, patch, post, put, requestBody, response} from '@loopback/rest';
  import {SecurityBindings, UserProfile} from '@loopback/security';
  import {I${modelName}} from '../../domain/entities';
  import {I${modelName}Repository} from '../../domain/repositories';
  import {${modelName}Repository} from '../../repositories';
  import {${entityName}Schema} from '../../repositories/mongo/api/schemas/${kebabfy(entityName)}.schema';
  import {getSwaggerRequestBodySchema, getSwaggerResponseSchema} from '../../utils/general-functions';
  import {badRequestErrorHttpResponse, createHttpResponse, notFoundErrorHttpResponse, okHttpResponse} from '../../utils/http-response.util';
  import {IHttpResponse} from '../../interfaces/http.interface';
  
  `;

  return code;
};

module.exports = {
  createControllerImports
}
