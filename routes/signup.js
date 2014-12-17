/**
 * Created by jjungmac on 2014. 12. 16..
 */
var fs = require('fs');
var http = require('http');
var express = require('express');
var ejs = require('ejs');
var pool = require('../modules/database.js');
var crypto = require('crypto');

var ensure = require('../modules/gateway.js');

var router = express.Router();



router.get('/',ensure, function (request, response) {
    response.render('signup');
});

router.post('/', ensure, function (request, response) {
    console.log('hellooo newbie');
    var email = request.param('email');
    var password = request.param('password');
    console.log('signup request : ',email, password);
    var shasum = crypto.createHash('sha1');
    shasum.update(password);
    password = shasum.digest('hex');

    var statement = 'INSERT INTO user (email, password) VALUES('+pool.escape([email,password])+');';
    console.log('statement:'+statement);
    pool.getConnection(function(error, connection) {
        console.error(error);
        connection.query(statement, function (error, result, fields) {
            connection.release();
            if (error) {
                console.log('error:'+error);
                response.redirect('/signup');
            } else {
                if (result) {console.log('result:'+result);}
                response.cookie('logined', true);
                response.redirect('/');
            }
        });
    });
});


module.exports = router;
