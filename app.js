const path    = require('path');
const express = require('express');

const middleware = require('./lib/api/rest-api/middleware');
const router     = require('./lib/api/rest-api/router');

// init express app
const app = express();

// mount middleware
app.use(middleware.json);
app.use(middleware.urlencoded);

// mount routes
app.use('/api', router);

module.exports = app;