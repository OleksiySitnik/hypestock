const { URL } = require('url');

const { validateToken } = require('../../utils/token');

module.exports = {
    auth(request) {
        const { searchParams } = new URL(`${request.headers.host}${request.url}`);
        const token = searchParams.get('token');

        validateToken(token);
    }
};
