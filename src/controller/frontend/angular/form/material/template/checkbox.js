const createCheckboxCode = async (project, element) => {
  const checkbox = element;
  const name = checkbox.name;
  const conditions = checkbox.conditions ? `*ngIf="${name}Condition"` : "";

  return `
    <mat-form-field ${conditions}>
      <section class="${name}-section" *ngFor="let ${name}Item of ${name}CheckboxObject">
        <mat-checkbox [value]="${name}Item.value" 
        formControlName="${name}">
          {{${name}Item.label}}
        </mat-checkbox>
      </section>
    </mat-form-field>
  `;
}

module.exports = {
  createCheckboxCode
}