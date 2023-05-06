import * as utils from "kunlatek-utils";

export const createControllerImports = (object) => {
  const entityName = object.id;
  const modelName = utils.pascalfy(entityName);

  let code = `
  import {authenticate} from '@loopback/authentication';
  import {inject} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {Request, Response, RestBindings, api, del, get, param, patch, post, put, requestBody, response} from '@loopback/rest';
  import {SecurityBindings, UserProfile} from '@loopback/security';
  import {I${modelName}} from '../../domain/entities';
  import {I${modelName}Repository} from '../../domain/repositories';
  import {${modelName}Repository} from '../../repositories';
  import {${entityName}Schema} from '../../repositories/mongo/api/schemas/${utils.kebabfy(entityName)}.schema';
  import {getSwaggerRequestBodySchema, getSwaggerResponseSchema} from '../../utils/general.util';
  import {IHttpResponse, badRequestErrorHttpResponse, createHttpResponse, notFoundErrorHttpResponse, okHttpResponse} from '../../utils/http-response.util';
  
  `;

  return code;
};
