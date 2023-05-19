const { getAllElements } = require("../../../utils.backend");

const getRelatedProperties = (object) => {

    const elements = getAllElements(object.elements);

    return elements.reduce((prev, current) => {
        if(!current.optionsApi) return prev;
        
        return prev += `.populate('${current.name}')`;
    }, '');

}

module.exports = {
    getRelatedProperties
}