// eslint-disable-next-line more/no-numeric-endings-for-variables
const argon2   = require('argon2');
const { SHA3 } = require('sha3');

const SHA3_SIZE = 512;

module.exports = {
    async hashPassword(password) {
        try {
            const sha3hash = new SHA3(SHA3_SIZE);
            const digest = sha3hash.update(password).digest('hex');

            return argon2.hash(digest);
        } catch (err) {
            console.log('Error while hashing', err);
        }
    },

    async checkPassword(password, passwordHash) {
        try {
            const sha3hash = new SHA3(SHA3_SIZE);
            const digest = sha3hash.update(password).digest('hex');

            return argon2.verify(passwordHash, digest);
        } catch (err) {
            console.log('Error while checking password', err);
        }
    }
};
