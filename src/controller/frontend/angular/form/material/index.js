const {createAutocompleteCode} = require("./template/autocomplete");
const {createCheckboxCode} = require("./template/checkbox");
const {createInputCode} = require("./template/input");
const {createRadioCode} = require("./template/radio");
const {createSelectCode} = require("./template/select");
const {createTabCode} = require("./template/tab");
const {createWysiwygCode} = require("./template/wysiwyg");

let templateCode = "";
let controllerCode = "";
let serviceCode = "";

createCodeOverMaterialUi = async (project, object, element) => {
  switch (element.elementType) {
    case "autocomplete":
      templateCode += await createAutocompleteCode(project, object, element);
      break;

    case "checkbox":
      templateCode += await createCheckboxCode(project, object, element);
      break;
    
    case "input":
      templateCode += await createInputCode(project, object, element);
      break;
    
    case "radio":
      templateCode += await createRadioCode(project, object, element);
      break;

    case "select":
      templateCode += await createSelectCode(project, object, element);
      break;

    case "tab":
      templateCode += await createTabCode(project, object, element, createCodeOverMaterialUi);
      break;

    case "wysiwyg":
      templateCode += await createWysiwygCode(project, object, element);
      break;

    default:
      console.error("There is no such kind of element")
      break;
  }

  const template = `
  <mat-card *ngIf="(isAddModule && updateOnePermission) || (!isAddModule && createOnePermission)">
    <mat-card-header>
      ${object.title}
      ${object.subtitle ?? object.subtitle}
    </mat-card-header>

    <mat-card-content>
      <!-- <div *ngIf="isLoading" class="loading">
        <mat-progress-bar color="primary" mode="buffer">
        </mat-progress-bar>
      </div> -->
      <form id="${object.id}" 
        [formGroup]="${object.id}Form" 
        #${object.id}Directive="ngForm" 
        (ngSubmit)="${object.id}Submit(${object.id}Directive)" 
      >
      ${templateCode}
      </form>
    </mat-card-content>
  </mat-card>
  `;
  
  const controller = ``;

  const service = ``;

  const result = {
    template: template,
    controller: controller,
    service: service
  }
  
  return result;
}

module.exports = {
  createCodeOverMaterialUi
}