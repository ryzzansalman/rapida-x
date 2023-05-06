const repositoryMain = require('./main/index');
const repositorySchemaMain = require('./schema/index')

const repositoriesMain = (object, projectPath) => {
    repositoryMain(object, projectPath);
    repositorySchemaMain(object, projectPath);
}

module.exports = {
    repositoriesMain
}