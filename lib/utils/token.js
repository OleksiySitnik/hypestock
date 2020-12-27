const jwt = require('jsonwebtoken');
const X   = require('chista/Exception').default;

const { SECRET } = require('../../config/token');

const { JsonWebTokenError, TokenExpiredError } = jwt;

module.exports = {
    generateToken(user) {
        const dataToSign = { userId: user.id };

        return jwt.sign(dataToSign, SECRET);
    },

    validateToken(token) {
        try {
            const decoded = jwt.verify(token, SECRET);

            return decoded;
        } catch (err) {
            if (err instanceof TokenExpiredError)  {
                throw new X({
                    code   : 'TOKEN_EXPIRED',
                    fields : {}
                });
            }

            if (err instanceof JsonWebTokenError && err.message === 'invalid signature') {
                throw new X({
                    code   : 'TOKEN_INVALID_SIGNATURE',
                    fields : {}
                });
            }

            if (err instanceof JsonWebTokenError && err.message === 'jwt malformed') {
                throw new X({
                    code   : 'TOKEN_JWT_MALFORMED',
                    fields : {}
                });
            }

            throw err;
        }
    }
};
