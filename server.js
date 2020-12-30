const http    = require('http');
const path    = require('path');
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

app.use(express.static(path.join(__dirname, 'static')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
    try {
        wsApiRouter(request, socket, head); // websocket API's routes
    } catch (err) {
        console.error('wsApiRouter.error', err);

        if (err.code === 'NOT_FOUND') {
            socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
            socket.destroy();
        } else if (
            err.code === 'TOKEN_EXPIRED' ||
            err.code === 'TOKEN_INVALID_SIGNATURE' ||
            err.code === 'TOKEN_JWT_MALFORMED'
        ) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
        } else {
            socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
            socket.destroy();
        }
    }
});

module.exports = server;
