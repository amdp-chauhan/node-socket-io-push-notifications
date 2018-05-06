const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const sendgridService = require('../api/services/sendgrid');
const dsService = require('../api/services/data-sources');

/**
 * MongoDB connection settings
 */
mongoose.connect(process.env.MONGODB_URL);

const handler = async actionHandler => {
  console.log(`Action ${argv.action} started`);
  console.log('Processing...');
  await actionHandler();
  // console.log(`Action ${argv.action} completed`);
  // process.exit(0);
};

if (argv.action === 'sendgrid:import') {
  handler(sendgridService.importList);
}

if (argv.action === 'geolocation:import') {
  handler(dsService.importGeolocationData);
}

if (argv.action === 'datasources:import') {
  handler(dsService.importDataSources);
}
