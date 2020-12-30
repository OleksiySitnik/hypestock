const { URL }   = require('url');
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ noServer: true });

const createStockPriceStream = require('../services/stockPrice')();

wsServer.on('connection', (ws, request, socket) => {
    const { searchParams } = new URL(`${request.headers.host}${request.url}`);
    const stockSymbol = searchParams.get('stockSymbol');

    if (!stockSymbol) {
        ws.send('Stock symbol required');
        socket.destroy();

        return;
    }

    const stockPrice$ = createStockPriceStream(stockSymbol);

    const subscription = stockPrice$.subscribe({
        next  : price => ws.send(price),
        error : err => {
            console.error(err);

            socket.destroy();
        }
    });

    ws.on('error', err => {
        console.error(err);

        subscription.unsubscribe();
    });
    ws.on('close', () => subscription.unsubscribe());
});

wsServer.on('error', err => {
    console.error(err);
});

module.exports = (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request, socket);
    });
};
