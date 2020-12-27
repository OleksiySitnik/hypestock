module.exports = Object.freeze({
    DB_CLIENT : process.env.DB_CLIENT || 'mysql',
    HOST      : process.env.MYSQL_HOST,
    USER      : process.env.MYSQL_USER,
    PASSWORD  : process.env.MYSQL_PASSWORD,
    DATABASE  : process.env.MYSQL_DATABASE
});
