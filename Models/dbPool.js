const Pool = require("pg").Pool

const myPool= new Pool({
    user: 'sgoldbach',
    password: 'sgoldbach',
    host: 'localhost',
    port: '5432',
    database: 'webshop',



});

module.exports = myPool;
