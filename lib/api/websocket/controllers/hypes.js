const { URL }   = require('url');
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ noServer: true });

const createHypesStream = require('../services/hypes')();

// eslint-disable-next-line no-unused-vars
wsServer.on('connection', (ws, request, socket) => {
    const { searchParams } = new URL(`${request.headers.host}${request.url}`);
    const stockSymbol = searchParams.get('stockSymbol');
    const keywordsString = searchParams.get('keywords') || [];
    const keywords = keywordsString.split(',');

    if (!stockSymbol) {
        ws.send('Stock symbol required');
        socket.destroy();

        return;
    }

    const hypes$ = createHypesStream(stockSymbol, keywords);

    const subscription = hypes$.subscribe({
        next  : news => ws.send(JSON.stringify(news)),
        error : err => {
            console.error(err);

            socket.destroy();
        }
    });

    ws.on('close', () => subscription.unsubscribe());
});

module.exports = (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
};
