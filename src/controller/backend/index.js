const {startLoopbackCoding} = require("./loopback/index");

const loopback = async (project) => {  
  await startLoopbackCoding(project);  
}

const gin = (project) => {
  
}

module.exports = {
	loopback,
	gin
}