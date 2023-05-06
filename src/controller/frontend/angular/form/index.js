const {createCodeOverMaterialUi} = require("./material/index");

let code = "";

const createCodeOverElement = (project, object, element) => {
  if (project.ui === "material") {
    code += createCodeOverMaterialUi(project, object, element);
  }

  if (project.ui === "antdesign") {
    
  }
}

module.exports = {
  createCodeOverElement
}