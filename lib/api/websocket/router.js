const controllers = require('./controllers');

module.exports = (request, socket, head) => {
    switch (request.url) {
        case '/hypes':
            controllers.hypes(request, socket, head);
            break;
        case '/stockPrice':
            controllers.stockPrice(request, socket, head);
            break;
        default:
            socket.destroy();
            break;
    }
};
