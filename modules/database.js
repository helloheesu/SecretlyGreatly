/**
 * Created by jjungmac on 2014. 12. 30..
 */

var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'guest_demo',
    password: '',
    database: 'movies',
    connectionLimit:20
});

module.exports = pool;