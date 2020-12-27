const app = require('./app');

const { HOST, PORT } = require('./config/server');

(async () => {
    app.listen(PORT, HOST, () => {
        console.log(`Server starts at ${HOST}:${PORT}`);
    });
})();
