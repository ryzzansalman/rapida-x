const createInputCode = async (project, element) => {
  const input = element;
  const dataType = input.dataType;
  const name = input.name;
  const label = input.label;
  const tooltip = input.tooltip ? `matTooltip="${input.tooltip}"` : "";
  const placeholder = input.placeholder ? `placeholder="${input.placeholder}"` : "";
  const isRequired = input.isRequired ? "required" : "";
  const conditions = input.conditions ? `*ngIf="${name}Condition"` : "";
  const validators = input.validators;
  const value = input.value ? input.value : "";
  const width = input.width ? input.width : "";
  const isDisabled = input.isDisabled ? "disabled" : "";
  const isAutoFocus = input.isAutoFocus ? input.isAutoFocus : "";
  // const arrayId = mappedArrayInInput ? mappedArrayInInput[mappedArrayInInput.length - 1].name : undefined;
  const callMethod = input.apiRequest ? setCallToMethodOnFocus(input, mappedArrayInInput) : "";
  const mask = input.mask ? input.mask : "";
  const isMultipleLines = input.isMultipleLines;
  
  let code = "";

  // Skeleton
  switch (dataType) {
    case "file":
      
      break;

    case "date":
    
      break;
  
    default:
      if (isMultipleLines) {

      }

      if (!isMultipleLines) {
        code += `
        <mat-form-field ${conditions}>
          <mat-label>${label}</mat-label>
          <input matInput type="${dataType}" formControlName="${name}" 
          ${placeholder} 
          ${tooltip} 
          ${isRequired} 
          ${isDisabled} 
          ${mask}
          ${callMethod}
          autocomplete="new-password">
        </mat-form-field>
        `;
      }
      break;
  }
  
  return code;
}

module.exports = {
  createInputCode
}