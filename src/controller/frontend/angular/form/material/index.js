const {createAutocompleteCode} = require("./autocomplete");
const {createCheckboxCode} = require("./checkbox");
const {createInputCode} = require("./input");
const {createRadioCode} = require("./radio");
const {createSelectCode} = require("./select");
const {createTabCode} = require("./tab");
const {createWysiwygCode} = require("./wysiwyg");

createCodeOverMaterialUi = async (project, element) => {
  switch (element.elementType) {
    case "autocomplete":
      await createAutocompleteCode(project, element);
      break;

    case "checkbox":
      await createCheckboxCode(project, element);
      break;
    
    case "input":
      await createInputCode(project, element);
      break;
    
    case "radio":
      await createRadioCode(project, element);
      break;

    case "select":
      await createSelectCode(project, element);
      break;

    case "tab":
      await createTabCode(project, element);
      break;

    case "wysiwyg":
      await createWysiwygCode(project, element);
      break;

    default:
      console.error("There is no such kind of element")
      break;
  }
}

module.exports = {
  createCodeOverMaterialUi
}