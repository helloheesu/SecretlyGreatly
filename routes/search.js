/**
 * Created by jjungmac on 2014. 12. 29..
 */

var express = require('express');
var router = express.Router();
var http = require('http');

var fs = require('fs');
var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var pool = require('../modules/database.js');

router.route('/')
    .get(function (req,res) {
        var statement = "SELECT * FROM ?? WHERE ?? LIKE ?";
        console.log(req);
        var inserts = ['movie', 'title', req.param('query')+"%"];
        statement = mysql.format(statement, inserts);
        console.log(statement);
        pool.getConnection(function(error, connection) {
            console.error(error);
            connection.query(statement, function (error, result) {
                connection.release();
                if (error) {
                    console.log('error:'+error);
                } else {
                    console.log(result.length);
                    res.render('queryResult', {
                        data: result
                    });
                }
            });
        });
    });

router.get('/ajax', function(req,res) {
    var input = req.param('query');
    console.log(input);
    var statement = "SELECT title,year FROM ?? WHERE ?? LIKE ? LIMIT 0, 10";
    var inserts = ['movie', 'title', req.param('query')+"%"];
    statement = mysql.format(statement, inserts);
    console.log(statement);
    pool.getConnection(function(error, connection) {
        console.error(error);
        connection.query(statement, function (error, result) {
            connection.release();
            if (error) {
                console.log('error:'+error);
            } else {
                console.log(result.length);
                res.render('template_search.ejs', {
                    data: result
                });
            }
        });
    });
});


module.exports = router;