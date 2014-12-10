var mysql = require('mysql');

var pool = mysql.createPool({
    user: 'guest_demo',
    password: '',
    database: 'movies',
    connectionLimit:20,
    waitForConnections:false
});

module.exports = pool;