import { TextTransformation } from "../../../../../utils/text.transformation";

export const createControllerMethods = (object) => {
  const entityName = object.id;
  const modelName = TextTransformation.pascalfy(entityName);
  const routeName = TextTransformation.plurarize(TextTransformation.kebabfy(entityName));

  let code = `
  ${object.publicRoutes?.includes('create') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'createOne'}})`
    }
  @post('/${routeName}')
  @response(201, getSwaggerResponseSchema())
  async create(
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: I${modelName}
  ): Promise<IHttpResponse> {
    try {
      const dataCreated = await this.${entityName}Repository.create({
        ...data,
        _createdBy: this.user?.userId,
        _ownerId: this.user?.userId,
      });

      return createHttpResponse({
        data: dataCreated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        request: this.httpRequest,
        response: this.httpResponse,
        message: err.message,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes('read') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'read'}})`
    }
  @response(200, getSwaggerResponseSchema(${entityName}Schema, true))
  async findAll(
    @param.query.string('filters') filters?: any,
    @param.query.number('limit') limit?: number,
    @param.query.number('page') page?: number,
  ): Promise<IHttpResponse> {
    try {
      const data = await this.${entityName}Repository.findAll(
        filters ?? {},
        limit ?? 100,
        page ?? 0,
      );

      return okHttpResponse({
        data,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes('readOne') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'readOne'}})`
    }
  @get('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async findOne(
    @param.path.string('id') id: string,
  ): Promise<IHttpResponse> {
    try {
      const data = await this.${entityName}Repository.findById(id);

      return okHttpResponse({
        data,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes('update') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'updateOne'}})`
    }
  @put('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async replace(
    @param.path.string('id') id: string,
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: I${modelName}
  ): Promise<IHttpResponse> {
    try {
      const dataUpdated = await this.${entityName}Repository.replaceById(id, data)

      return okHttpResponse({
        data: dataUpdated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes('update') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'updateOne'}})`
    }
  @patch('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async update(
    @param.path.string('id') id: string,
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: Partial<I${modelName}>
  ): Promise<IHttpResponse> {
    try {
      const dataUpdated = await this.${entityName}Repository.updateById(id, data)

      return okHttpResponse({
        data: dataUpdated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes('delete') ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'deleteOne'}})`
    }
  @del('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema())
  async delete(
    @param.path.string('id') id: string
  ): Promise<IHttpResponse> {
    try {
      await this.${entityName}Repository.deleteById(id);

      return okHttpResponse({
        request: this.httpRequest,
        response: this.httpResponse,
      })
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  `;

  return code;
};
