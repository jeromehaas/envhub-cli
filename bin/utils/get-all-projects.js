// IMPORTS
const axios = require("axios");
const { Select } = require("enquirer");

// GET ALL PROJECTS
const getAllProjects = async () => {

  // GET ALL PROJECTS
  const res = await axios({
    method: "GET",
		url: `${process.env.SERVER_BASE_URL}/projects`,
    headers: {
    headers: {
      "Content-type": "application/json",
			"Authorization": process.env.AUTH_KEYPASS,
    },
  });

  // CREATE ARRAY WITH ONLY THE NAMES
  const names = res.data.data.projects.map((project) => {
    return project.name;
  });

  // DEFINE PROMPT
  const prompt = new Select({
    name: "choosenProject",
    message: "Choose the project:",
    choices: names,
  });

  // RUN PROMPT
  prompt
    .run()
    .then((answer) => {
      console.log(answer);
    })
    .catch((error) => {
      console.log(error);
    });
};

// EXPORTS
module.exports = getAllProjects;
