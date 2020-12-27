const { Users } = require('../../db');

module.exports = {
    async create(email, passwordHash) {
        await Users().insert({
            email,
            password_hash : passwordHash,
        });
    },

    async findByEmail(email) {
        const [ user ] = await Users().where({ email });

        return user;
    },

    async findById(id) {
        const [ user ] = await Users().where({ id });

        return user;
    }
};
