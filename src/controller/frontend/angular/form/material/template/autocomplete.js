const { 
  pascalfy,
  singularize,
} = require("../../../../../../../utils/text.transformation");

const createAutocompleteCode = async (project, element, array) => {
  const autocomplete = element;
  const dataType = autocomplete.dataType;
  const name = autocomplete.name;
  const label = autocomplete.label;
  const tooltip = autocomplete.tooltip ? `matTooltip="${autocomplete.tooltip}"` : "";
  const placeholder = autocomplete.placeholder ? `placeholder="${autocomplete.placeholder}"` : "";
  const isRequired = autocomplete.isRequired ? "required" : "";
  const conditions = autocomplete.conditions ? `*ngIf="${name}Condition"` : "";
  const labelField = autocomplete.optionsApi.labelField;
  const valueField = autocomplete.optionsApi.valueField;

  let setCondition = "";
  if (autocomplete.isTriggerToCondition) {
    setCondition += `(focusout)="`;

    // if (array) {
    //   setCondition += `setConditionIn${namePascal}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? ", " : ""
    //     }${array
    //       ? `${arrayIdSingular}Index, `
    //       : ``
    //     })`;
    // }

    if (!array) {
      setCondition += `setCondition()`;
    }
    setCondition += `"`;
  }

  let code = '';
  
  if (autocomplete.isMultiple) {
    code += `
      <mat-form-field class="full-width" ${conditions}>
        <mat-label>${label}</mat-label>
        <mat-chip-list #${name}ChipList aria-label="Seleção de ${label.toLowerCase()}">
          <mat-chip 
            *ngFor="let ${name}Item of get${pascalfy(name)}(${array ? `${singularize(array.id)}Index` : ``})"
            (removed)="remove${pascalfy(name)}(${array ? `${singularize(array.id)}Index, ` : ""}${name}Item)">
            {{${name}Item}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
          <input 
            ${placeholder} ${tooltip} 
            type="${dataType}" 
            formControlName="${name}" 
            ${setCondition} 
            matInput 
            [matAutocomplete]="auto${pascalfy(name)}" 
            [matChipInputFor]="${name}ChipList" 
            [matChipInputSeparatorKeyCodes]="${name}SeparatorKeysCodes"
            (matChipInputTokenEnd)="add${pascalfy(name)}(${array ? `${singularize(array.id)}Index, ` : ``}$event)"
            (keyup)="callSetFiltered${pascalfy(name)}($event${array ? `, ${singularize(array.id)}Index` : ``})" 
            (blur)="clear${pascalfy(name)}Input($event)"
            #${name}Input 
            ${isRequired}
          >
        </mat-chip-list>
        <mat-autocomplete 
          #auto${pascalfy(name)}="matAutocomplete" 
          (optionSelected)="selected${pascalfy(name)}(${array ? `${singularize(array.id)}Index, ` : ``}$event)"
        >
        <mat-option disabled *ngIf="loading${pascalfy(name)}">
          <mat-spinner diameter="35"></mat-spinner>
        </mat-option>
        <ng-container *ngIf="!loading${namePascal};">
          <mat-option *ngFor="let ${name}Item of filtered${pascalfy(name)}" [value]="${name}Item.${valueField}">
    `

    if (!Array.isArray(labelField)) {
      code += `{{${name}Item.${labelField}}}`;
    }

    if (Array.isArray(labelField)) {
      const labelFieldLength = labelField.length;
      labelField.forEach((e, index) => {
        code += `{{${name}Item.${e}}}`;
        if (labelFieldLength > index + 1) {
          code += ` - `;
        }
      });
    }

    code += `
            </mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field>
    `;
  }

  if (!autocomplete.isMultiple) {
    code += `
      <mat-form-field ${conditions}>
        <mat-label>${label}</mat-label>
        <input 
          type="${dataType}" 
          ${placeholder} ${tooltip} 
          aria-label="${label}" 
          formControlName="${name}" 
          matInput 
          ${setCondition} 
          [matAutocomplete]="auto${pascalfy(name)}" 
          (keyup)="callSetFiltered${pascalfy(name)}($event${array ? `${singularize(array.id)}Index` : ``})" 
          ${isRequired}
        >
        <mat-autocomplete 
          #auto${pascalfy(name)}="matAutocomplete" 
          [displayWith]="displayFnTo${pascalfy(name)}${array ? `.bind(this , ${singularize(array.id)}Index)` : ""}"
        >
          <mat-option disabled *ngIf="loading${pascalfy(name)}">
            <mat-spinner diameter="35"></mat-spinner>
          </mat-option>
          <ng-container *ngIf="!loading${pascalfy(name)};">
          <mat-option *ngFor="let ${name}Item of filtered${pascalfy(name)}${array ? `[${singularize(array.id)}Index]` : ''}" [value]="${name}Item.${valueField}">`;

    if (!Array.isArray(labelField)) {
      code += `{{${name}Item.${labelField}}}`;
    }

    if (Array.isArray(labelField)) {
      const labelFieldLength = labelField.length;
      labelField.forEach((e, index) => {
        code += `{{${name}Item.${e}}}`;
        if (labelFieldLength > index + 1) {
          code += ` - `;
        }
      });
    }

    code += `
          </mat-option>
        </ng-container>
      </mat-autocomplete>
    </mat-form-field>
    `;
  }

  return code;
}

module.exports = {
  createAutocompleteCode
}