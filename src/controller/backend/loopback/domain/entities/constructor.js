const { 
  getAllElements,
} = require("../../../utils.backend");

const createConstructor = (object) => {
  let code = `
    this._id = entity._id;
    this._createdBy = entity._createdBy;
    this._ownerId = entity._ownerId;
  `;

  const elements = getAllElements(object.elements);

  elements.forEach((element) => {
    code += `this.${element.name} = entity.${element.name};`;
  });

  return code;
};

module.exports = {
  createConstructor
}