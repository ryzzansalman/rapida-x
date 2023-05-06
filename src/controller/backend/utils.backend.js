/**
 * Get all elements from object
 * @param   {Array}    elements Elements array
 * @returns {Array}     Array of elements
 */
export const getAllElements = (elements) => {
    return (elements || [])
        .map(element => {
            if(element.elementType === 'tab') {
                return element.tabs
                    .map(tab => tab.elements);
            } else {
                return element
            }
        })
        .flat();    
}

export const stringTypes = [
    "email",
    "password",
    "tel",
    "text",
    "url",
    "month",
    "range",
    "time",
    "url",
    "week",
    'date',
    'datetime-local'
];

export const numberTypes = ["number"];

export const booleanTypes = ["slide"];