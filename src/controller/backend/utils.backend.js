const fs = require('fs');
const chp = require('child_process');

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
                    .map(tab => tab.elements).flat();
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

/**
 * Create project dir
 * @param {String} projectName 
 */
const createProjectDir = (projectName) => {
    console.info(`Creating ${projectName}-project folder`);
	
    if(!fs.existsSync(`../${projectName}-project`))
        fs.mkdirSync(`../${projectName}-project`);
    
    console.info(`${projectName}-project folder created`);
}

/**
 * Create project from quickstart
 * @param {String} projectName 
 * @param {String} quickstartGitPath 
 */
const createProjectFromQuickstart = (projectName, quickstartGitPath) => {
    
    if(!fs.existsSync(`../${projectName}-project/${projectName}-api`)){
        console.info(`Getting quickstart-api`);
        chp.execSync(`
        	cd ../${projectName}-project &&
        	git clone ${quickstartGitPath} ${projectName}-api &&
        	cd ${projectName}-api &&
        	git checkout dev &&
            rm -rf .git
        `);
        
        console.info(`Installing modules`);
        chp.execSync(`
            cd ../${projectName}-project/${projectName}-api &&
            npm install --save --legacy-peer-deps
        `);
        console.info(`Modules installed`);
    }

}

module.exports = {
    getAllElements,
    stringTypes,
    numberTypes,
    booleanTypes,
    createProjectDir,
    createProjectFromQuickstart,
}