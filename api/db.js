const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'phonesdb',
    password: '8800',
    port: 5432,
});

module.exports = pool;