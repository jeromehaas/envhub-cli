// IMPORTS
const { createProject } = require('./create-project.js');
const createSecret = require('./create-secret.js');
const { getAllProjects } = require('./get-all-projects.js');
const { getAllSecrets } = require('./get-all-secrets.js');
const { login } = require('./login.js');

// EXPORTS
module.exports = {
  createProject,
  createSecret,
  getAllProjects,
  getAllSecrets,
  login,
};
