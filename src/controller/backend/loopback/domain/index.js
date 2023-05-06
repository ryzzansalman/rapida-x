const {entityMain} = require('./entities/index');
const {domainRepositoryMain} = require('./repositories/index');

const domainMain = async (object, projectPath) => {
    entityMain(object, projectPath);
    domainRepositoryMain(object, projectPath);
}

module.exports = {
    domainMain
}