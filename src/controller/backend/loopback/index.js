const path = require('path');
const fs = require('fs');
const {
  createArrayOverFolderFiles
} = require("../../../../utils/array");
const projectsPath = path.join(__dirname, "..", "..", "..", "..", "project");

const { domainMain } = require('./domain/index');
const { repositoriesMain } = require('./repositories/index');
const { controllerMain } = require('./controller/index');

const startLoopbackCoding = async (project) => {
  const filesInProjectFolderToSetParams = createArrayOverFolderFiles(
    `${projectsPath}/${project.folder}`
  );
  await takeObject(project, filesInProjectFolderToSetParams);
}

takeObject = (project, filesInProjectFolderToSetParams) => {
  filesInProjectFolderToSetParams.forEach(async (file) => {
    if (file != '') {
      const string = fs.readFileSync(`${projectsPath}/${project.folder}/${file}`, "utf8");
      const object = JSON.parse(string);
      await createCode(object, ``);
    }
  });
}

createCode = async (object, projectPath) => {
  if (object.kind !== 'form') {
    console.info("Only forms set here");
    return ``;
  }

  domainMain(object, projectPath);
  repositoriesMain(object, projectPath);
  controllerMain(object, projectPath);
}

module.exports = {
  startLoopbackCoding
}