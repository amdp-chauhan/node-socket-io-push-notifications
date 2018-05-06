
const createHandler = require('azure-function-express').createAzureFunctionHandler;
const app = require('./app');

module.exports.handler = createHandler(app);
