const server = require('./server');

const { HOST, PORT } = require('./config/server');

(async () => {
    server.listen(PORT, HOST, () => {
        console.log(`Server starts at ${HOST}:${PORT}`);
    });
})();
