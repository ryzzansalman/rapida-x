let codeTab = ""
const createTabCode = async (project, object, element, createCodeOverMaterialUi) => {
  for (let i = 0; i < element.tabs.length; i++) {
    const tab = element.tabs[i];
    
    for (let j = 0; j < tab.elements.length; j++) {
      const tabElement = tab.elements[j];
      console.info(`Form:Material:Tab - Dealing with elements - ${tab.title} - ${tabElement.elementType}`);
      codeTab += await createCodeOverMaterialUi(project, object, tabElement);
    }
  }

  return codeTab;
}

module.exports = {
  createTabCode
}