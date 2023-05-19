const createRadioCode = async (project, element) => {
  const radio = element;
  const name = radio.name;
  const label = radio.label;
  const conditions = radio.conditions ? `*ngIf="${name}Condition"` : "";
  
  return `
    <mat-form-field ${conditions}>
      <label id="${name}-radio-group-label">{{${label}}}</label>
      <mat-radio-group
        aria-labelledby="${name}-radio-group-label"
        class="${name}-radio-group"
        formControleName="${name}">
        <mat-radio-button class="${name}-radio-button" *ngFor="let ${name}Item of ${name}RadioObject" [value]="${name}Item.value">
          {{${name}Item.label}}
        </mat-radio-button>
      </mat-radio-group>
    </mat-form-field>
  `;
}

module.exports = {
  createRadioCode
}