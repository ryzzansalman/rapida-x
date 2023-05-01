const {createCodeOverMaterialUi} = require("./material/index");

const createCodeOverElement = (project, element) => {
  if (project.ui === "material") {
    createCodeOverMaterialUi(project, element);
  }

  if (project.ui === "antdesign") {
    
  }
}

module.exports = {
  createCodeOverElement
}