// IMPORTS
const axios = require("axios");
const { Form } = require("enquirer");
const { createSpinner  } = require('nanospinner');

// CREATE PROJECT
const createProject = async () => {

	// TRY-CATCH  BLOCK
  try {

		// SETUP SPINNER
		const spinner = createSpinner();

		// DEFINE PROMPT
		const prompt = new Form({
			name: "project",
			message: "Please provide the name and the repository url:",
			choices: [
				{ name: "name", message: "Name", initial: "" },
				{ name: "repository-url", message: "Repository URL", initial: "" },
			],
			validate: (input) => {
				return input["name"] !== "" ? true : "Please provide the name";
			},
		});

		// RUN PROMPT
		const answer = await prompt.run();

		// START SPINNER
		spinner.start({ text: 'Loading...' });
		
		// MAKE REQUEST
		const res = await axios({
			method: "POST",
			url: `${process.env.SERVER_BASE_URL}/projects`,
			headers: {
				"Content-type": "application/json",
				"Authorization": process.env.AUTH_KEYPASS,
			},
			data: {
				name: answer['name'],
			},
		}); 

		// UPDATE SPINNER
		spinner.success({ text: 'The project was created successfully!' });
    
  // HANDLE ERRORS
  } catch(error) {

    // UPDATE SPINNER
    spinner.fail({ text: 'Could not create project!'});

  };

};

// EXPORTS
module.exports = {
  createProject,
};
