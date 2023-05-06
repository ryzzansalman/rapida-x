import * as fs from "fs";
import { TextTransformation } from "../../../../../../utils/text.transformation";

export const setSeedModules = (object, projectPath) => {

    const entityName = object.id;
    const modelName = TextTransformation.pascalfy(entityName);
    const routeName = TextTransformation.kebabfy(entityName);

    let code = `
    ,{
        "name": "${modelName}",
        "description": "${modelName}",
        "collectionName": "${modelName}",
        "route": "${routeName}"
    }
    `;

    setSeedModuleArchitectureAndWriteToFile(code, projectPath);
};

const setSeedModuleArchitectureAndWriteToFile = (code, projectPath) => {
    const filePath = `${projectPath}-api/src/utils/seed/Module.json`;
    fs.appendFile(filePath, code, () => { });
};
