import { string } from "kunlatek-utils";

export const createControllerConstructorParams = (object) => {

  const entityName = object.id;
  const modelName = string.pascalfy(entityName);


  let code = `
  @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
  @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,

  @repository(${modelName}Repository) private ${entityName}Repository: I${modelName}Repository,

  @inject(SecurityBindings.USER, {optional: true}) private user?: UserProfile,
  `;

  return code;
};
