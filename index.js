// setup fetch and AbortController for using rxjs fetch API
global.fetch           = require('node-fetch');
global.AbortController = require('abort-controller');

const server         = require('./server');
const { HOST, PORT } = require('./config/server');

(async () => {
    server.listen(PORT, HOST, () => {
        console.log(`Server starts at ${HOST}:${PORT}`);
    });
})();
