const X = require('chista/Exception').default;

const controllers = require('./controllers');
const middleware  = require('./middleware');

module.exports = (request, socket, head) => {
    const { url } = request;

    if (/\/hypes/.test(url)) {
        middleware.auth(request, socket);
        controllers.hypes(request, socket, head);
    } else if (/\/stockPrice/.test(url)) {
        middleware.auth(request, socket);
        controllers.stockPrice(request, socket, head);
    } else {
        throw new X({
            code   : 'NOT_FOUND',
            fields : {}
        });
    }
    // switch (request.url) {
    //     case '/hypes':
    //         middleware.auth(request, socket);
    //         controllers.hypes(request, socket, head);
    //         break;
    //     case '/stockPrice':
    //         middleware.auth(request, socket);
    //         controllers.stockPrice(request, socket, head);
    //         break;
    //     default:
    //         throw new X({
    //             code   : 'NOT_FOUND',
    //             fields : {}
    //         });
    // }
};
