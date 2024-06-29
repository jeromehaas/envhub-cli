// IMPORTS
const axios = require("axios");
const { Select, Form, Password, Input, Toggle } = require("enquirer");
const { createSpinner  } = require('nanospinner');
const moment = require('moment');

// SELECT PROJECT
const selectProject = async () => {

  // GET PROJECTS
  const { data: { data: { projects } } } = await axios({
    mehtod: "GET",
		url: `${process.env.SERVER_BASE_URL}/projects`,
    headers: {
      "Content-type": "application/json",
      "Authorization": process.env.AUTH_KEYPASS ,
    },
  });

  // DEFINE CHOICES
  const choices = projects.map((project) => {
    return { name: project.name, value: { id: project.id, name: project.name } };
  });

  // DEFINE PROMPT
  const project = await new Select({
    name: "project",
    message: "Choose a project:",
    choices: choices,
    result: (value) => choices.find(choice => choice.name === value).value,
  }).run();

  // RETURN PROJECT 
  return project;

};

// SELECT  ENVIRONMENT
const selectEnvironment = async () => {

  // DEFINE PROMPT
  const environment = await new Select({
    name: "environment",
    message: "Choose the environment:",
    choices: ['production', 'development', 'local'],
  }).run();

  // RETURN ENVIRONMENT
  return environment;

};

// SELECT LAYER
const selectLayer = async () => {

  // DEFINE PROMPT
  const layer = await new Select({
    name: "layer",
    message: "Choose the layer:",
    choices: ['website', 'cms', 'server', 'cli', 'dashboard'],
  }).run();

  // RETURN LAYER
  return layer;

};

// SELECT SECRETS
const selectSecrets = async () => {
  
  // SETUP VARIABLE FOR SECRETS
  const secrets = [];

  // CREATE LOOP TO ADD MULTIPLE SECRETS
  while (true) {

    // DEFINE PROMPT
    const secret = await new Form({
      name: 'secret', 
      message: 'Enter the name and the value of the secret:',
      choices: [
         { name: 'name', message: 'Name', initial: '', validate: (value) => { return value !== "" ? true : "Please enter the name"} },
         { name: 'value', message: 'Value', initial: '', validate: (value) => { return value !== "" ? true : "Please enter the value" } },
      ],
      validate: (value) => value["name"] !== "" && value["value"] !== "" ? true : "Please enter name and value",
    }).run();
  
    // ADD SECRET TO ARRAY
    secrets.push(secret);

    // CHECK IF MORE SECRETS NEED TO BE ADDED`
    const isDone = await new Toggle({
      message: 'Add another secret?',
      enabled: 'No',
      disabled: 'Yes'
    }).run();

    // BREAK LOOP IF NO MORE SECRETS
    if (isDone) break;

  };

  // RETURN SECRETS
  return secrets;
  
};

// CREATE SECRETS
const createSecrets = async ({ project, environment, layer, secrets }) => {

    // LOOP OVER SECRETS 
    secrets.forEach( async (secret) => {

      // HTTP REQUEST
      await axios({
        method: 'POST',
				url: `${process.env.SERVER_BASE_URL}/secrets`,
        headers: {
          "Content-type": "application/json",
					"Authorization": process.env.AUTH_KEYPASS,
        },
        data: {
          environment: environment,
          layer: layer,
          name: secret.name,
          value: secret.value,
          projectId: project.id,
				  createdAt: moment().format('YYYY-MM-DD/HH:mm:ss'),
        },
      });

    }); 

}; 

// MAIN
const main = async () => {

	// TRY-CATCH BLOCK
  try {
    
    // SETUP SPINNER
    const spinner = createSpinner();

    // GET ANSERS
    const project = await selectProject(); 
    const environment = await selectEnvironment();
    const layer = await selectLayer(); 
    const secrets = await selectSecrets();
  
    // CREATE SECRETS
    await createSecrets({
      project: project,
      environment: environment,
      layer: layer,
      secrets: secrets
    });

		// HANDLE ERRORS
  } catch (error) {

		//  PRINT ERROR
		console.error(error);

  };

};

// EXPORTS
module.exports = main;
