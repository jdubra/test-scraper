const sequelize = require('./connection');
require('./models');

sequelize.sync()
  .then(() => {
    console.log('DB synced!');
  })
  .catch(err => {
    console.error('DB sync error:', err);
  });

const dataAccess = require('./data-access');

module.exports = {
  ...dataAccess,
};