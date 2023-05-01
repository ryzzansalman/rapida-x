const {startAngularCoding} = require("./angular/index");

const angular = async (project) => {  
  await startAngularCoding(project);  
}

const svelte = (project) => {
  
}

module.exports = {
  angular,
  svelte
}