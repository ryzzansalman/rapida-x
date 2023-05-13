const { LOOPBACK_QUICKSTART } = require("./constants");
const { startLoopbackCoding } = require("./loopback/index");
const { createProjectDir, createProjectFromQuickstart } = require("./utils.backend");

const loopback = async (project) => {
	createProjectDir(project.folder);
	createProjectFromQuickstart(project.folder, LOOPBACK_QUICKSTART);

  await startLoopbackCoding(project);
};

const gin = (project) => {};

module.exports = {
  loopback,
  gin,
};
