const fs = require("fs");
const { 
    pascalfy,
    kebabfy,
} = require("../../../../../../utils/text.transformation");

const setSeedModules = (object, projectPath) => {
    const filePath = `${projectPath}-api/src/utils/seed/Module.json`;
    const modules = require(filePath) ?? [];

    const entityName = object.id;
    const modelName = pascalfy(entityName);
    const routeName = kebabfy(entityName);

    modules.push({
        'name': modelName,
        'description': modelName,
        'collection': modelName,
        'route': `/${routeName}`,
        'icon': object.icon ?? 'dashboard',
    });

    fs.writeFileSync(filePath, JSON.stringify(modules));
};

module.exports = {
    setSeedModules
}