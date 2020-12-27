const knex = require('./connection');

module.exports = {
    Users : () => knex('users')
};
