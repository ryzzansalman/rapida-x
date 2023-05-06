const {startAngularCoding} = require("./angular/index");

let code = "";

const angular = async (project) => {
  code += await startAngularCoding(project);
}

const svelte = (project) => {
  
}

module.exports = {
  angular,
  svelte
}