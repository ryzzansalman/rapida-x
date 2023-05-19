const { 
  pascalfy
} = require("../../../../../../../utils/text.transformation");

const createSelectCode = async (project, element, array) => {
  const select = element;
  const name = select.name;
  const label = select.label;
  const tooltip = select.tooltip ? `matTooltip="${select.tooltip}"` : "";
  const isRequired = select.isRequired ? "required" : "";
  const conditions = select.conditions ? `*ngIf="${name}Condition"` : "";
  // const arrayId = mappedArrayInInput ? mappedArrayInInput[mappedArrayInInput.length - 1].name : undefined;
  const isMultiple = select.isMultiple ? "multiple" : "";

  let setCondition = "";
  if (select.isTriggerToCondition) {
    setCondition += `(selectionChange)="`;

    // if (array) {
    //   setCondition += `setConditionIn${pascalfy(name)}(
    //     ${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? ", " : ""
    //     }${array ? `${arrayIdSingular}Index, ` : ``})`;
    // }

    if (!array) {
      setCondition += `setCondition()`;
    }
    setCondition += `"`;
  }

  return `
    <mat-form-field ${conditions}>
      <mat-label>${label}</mat-label>
      <mat-select formControlName="${name}" ${tooltip} ${isRequired} ${isMultiple} ${setCondition}>
        <mat-option *ngFor="let ${name}Item of ${name}SelectObject" [value]="${name}Item.value">
          {{${name}Item.label}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `
}

module.exports = {
  createSelectCode
}