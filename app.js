const http    = require('http');
const express = require('express');

const middleware    = require('./lib/api/rest-api/middleware');
const restApiRouter = require('./lib/api/rest-api/router');
const wsApiRouter   = require('./lib/api/websocket/router');

// init express app
const app = express();

// mount middleware
app.use(middleware.json);
app.use(middleware.urlencoded);

// mount routes
app.use('/api', restApiRouter); // REST API's routes

const server = http.createServer(app);

server.on('upgrade', wsApiRouter); // websocket API's routes

module.exports = server;
