/**
 * Get all elements from object
 * @param   {Array}    elements Elements array
 * @returns {Array}     Array of elements
 */
const getAllElements = (elements) => {
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

const stringTypes = [
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

const numberTypes = ["number"];

const booleanTypes = ["slide"];

module.exports = {
    getAllElements,
    stringTypes,
    numberTypes,
    booleanTypes,
}