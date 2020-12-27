const client   = 'mysql';
const {
    MYSQL_HOST     : host,
    MYSQL_USER     : user,
    MYSQL_PASSWORD : password,
    MYSQL_DATABASE : database
} = process.env;

module.exports = {
    development : {
        client,
        connection : {
            host,
            user,
            password,
            database
        }
    },
    staging : {
        client,
        connection : {
            host,
            user,
            password,
            database
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    },
    production : {
        client,
        connection : {
            host,
            user,
            password,
            database
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    }
};
