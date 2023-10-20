require('../sequelize')

const logger = require('morgan');
const express = require('express');
const controllers = require('./controllers');
const app = express();

app.use(logger('tiny'));

app.use('/', controllers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});