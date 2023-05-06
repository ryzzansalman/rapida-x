const path = require('path');
const fs = require('fs');
const utils = require("../../../../../../sara/scripts-automation-node/index");
const projectsPath = path.join(__dirname, "..", "..", "..", "..", "project");
const {createCodeOverElement} = require("./form/index");

const startAngularCoding = async (project) => {
  const filesInProjectFolderToSetParams = utils.array.createArrayOverFolderFiles(
    `${projectsPath}/${project.folder}`
  );

  await takeObject(project, filesInProjectFolderToSetParams);
}

takeObject = (project, filesInProjectFolderToSetParams) => {
  filesInProjectFolderToSetParams.forEach(async (file) => {
    if (file != '') {
      const string = await fs.readFileSync(`${projectsPath}/${project.folder}/${file}`, "utf8");
      const object = JSON.parse(string);
      await takeElements(project, object);
    }
  });
}

takeElements = async (project, object) => {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (key === "elements") {
        const elements = object[key];
        elements.forEach(element => {
          createCodeOverElement(project,element)
        });
      }
    }
  }
}

module.exports = {
  startAngularCoding
}