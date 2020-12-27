const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ noServer: true });

// eslint-disable-next-line no-unused-vars
wsServer.on('connection', ws => {
    console.log('connection on /hypes');
    // TODO: implement this handler
});

module.exports = (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
};
