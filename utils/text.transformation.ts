const pluralize = require("pluralize");

export class TextTransformation {
  static pascalfy(text: string): string {

    let textArray = text.split(' ');
    textArray.forEach((term, termIndex) => {
      textArray[termIndex] = this.capitalization(term);
    })

    const pascalCase = textArray.join('');

    return pascalCase;
  }

  static kebabfy(text: string): string {
    const kebabCase = text
      .split('')
      .map((letter: string, idx: number) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
      })
      .join('');
    return kebabCase;
  }

  static plurarize(text: string): string {
    return pluralize(text);
  }

  static singularize(text: string): string {
    return pluralize.singular(text);
  }

  static replaceKebabfyFunctionToString(template: string): string {
    const regex = /\%kebabfy(.*?)%/g;
    const foundKebabfies = template.match(regex);

    const stringsToKebakfy = foundKebabfies
      ?.join(',')
      .replace(/\%/g, '')
      .replace(/kebabfy/g, '')
      .replace(/\(|\)/g, '')
      .split(',');

    stringsToKebakfy?.forEach((stringToKebakfy, index) => {
      const kebabfy = this.kebabfy(stringToKebakfy);
      const foundKebabfy =
        (foundKebabfies?.length && foundKebabfies[index]) || '';
      template = template.replace(foundKebabfy, kebabfy);
    });

    return template;
  }

  static replacePascalfyFunctionToString(template: string): string {
    const regex = /\%pascalfy(.*?)%/g;
    const foundPascalfies = template.match(regex);

    const stringsToPascalfy = foundPascalfies
      ?.join(',')
      .replace(/\%/g, '')
      .replace(/pascalfy/g, '')
      .replace(/\(|\)/g, '')
      .split(',');

    stringsToPascalfy?.forEach((stringToPascalfy, index) => {
      const pascalfy = this.pascalfy(stringToPascalfy);
      const foundPascalfy =
        (foundPascalfies?.length && foundPascalfies[index]) || '';
      template = template.replace(foundPascalfy, pascalfy);
    });
    return template;
  }

  static replacePlurarizeFunctionToString(string: string): string {
    const regex = /\%pluralize(.*?)%/g;
    const foundPluralizes = string.match(regex);

    const stringsToPluralize = foundPluralizes
      ?.join(',')
      .replace(/\%/g, '')
      .replace(/pluralize/g, '')
      .replace(/\(|\)/g, '')
      .split(',');

    stringsToPluralize?.forEach((stringToPluralize, index) => {
      const pluralizeString = pluralize(stringToPluralize);
      const foundPluralize =
        (foundPluralizes?.length && foundPluralizes[index]) || '';
      string = string.replace(foundPluralize, pluralizeString);
    });
    return string;
  }
  // TO-DO: CHECK IF IT IS STILL NECESSARY
  static setIdToPropertyName(id: string): string {
    let propertyName = '';
    const array = id.split('-');
    propertyName += array[0].toLowerCase();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (i > 0)
        propertyName += element.charAt(0).toUpperCase() + element.slice(1);
    }

    return propertyName;
  }

  static setIdToClassName(id: string): string {
    let className = '';
    const array = id.split('-');
    className += array[0].charAt(0).toUpperCase() + array[0].slice(1);
    for (let i = 0; i < array.length; i++) {
      const element = array[i];

      if (i > 0)
        className += element.charAt(0).toUpperCase() + element.slice(1);
    }

    return className;
  }

  static capitalization(term: string): string {
    return term
      .replace(/([A-Z])/g, '$1')
      .replace(/^./, function (str: string) {
        return str.toUpperCase();
      });
  }
}
