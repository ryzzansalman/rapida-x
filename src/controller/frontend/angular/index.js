const path = require('path');
const fs = require('fs');
const utils = require("kunla-utils");
const projectsPath = path.join(__dirname, "..", "..", "..", "..", "project");
const {createCodeOverElement} = require("./form/index");

let code = "";

const startAngularCoding = async (project) => {
  const filesInProjectFolderToSetParams = utils.array.createArrayOverFolderFiles(
    `${projectsPath}/${project.folder}`
  );
  
  code += takeObject(project, filesInProjectFolderToSetParams);
}

const takeObject = (project, filesInProjectFolderToSetParams) => {
  filesInProjectFolderToSetParams.forEach(async (file) => {
    if (file != '') {
      const string = fs.readFileSync(`${projectsPath}/${project.folder}/${file}`, "utf8");
      const object = JSON.parse(string);
      await takeElements(project, object);
    }
  });
}

const takeElements = async (project, object) => {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (key === "elements") {
        const elements = object[key];
        elements.forEach(element => {
          createCodeOverElement(project, object, element)
        });
      }
    }
  }
}

module.exports = {
  startAngularCoding
}