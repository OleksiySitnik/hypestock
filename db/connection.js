const knex = require('knex');

const {
    DB_CLIENT,
    HOST,
    USER,
    PASSWORD,
    DATABASE
} = require('../config/db');

module.exports = knex({
    client     : DB_CLIENT,
    connection : {
        host     : HOST,
        user     : USER,
        password : PASSWORD,
        database : DATABASE
    }
});
