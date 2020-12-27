const argon2   = require('argon2');
const { SHA3 } = require('sha3');

module.exports = {
    async hashPassword(password) {
        try {
            const sha3hash = new SHA3(512);
            const digest = sha3hash.update(password).digest('hex');

            return argon2.hash(digest);
        } catch (err) {
            console.log('Error while hashing', err);
        }
    },

    async checkPassword(password, passwordHash) {
        try {
            const sha3hash = new SHA3(512);
            const digest = sha3hash.update(password).digest('hex');

            return argon2.verify(passwordHash, digest);
        } catch (err) {
            console.log('Error while checking password', err);
        }
    }
};
