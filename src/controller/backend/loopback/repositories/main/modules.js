const fs = require("fs");
const { 
    pascalfy,
    kebabfy,
} = require("kunlatek-utils");

const setSeedModules = (object, projectPath) => {

    const entityName = object.id;
    const modelName = pascalfy(entityName);
    const routeName = kebabfy(entityName);

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

module.exports = {
    setSeedModules
}