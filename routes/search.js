/**
 * Created by jjungmac on 2014. 12. 29..
 */

var express = require('express');
var router = express.Router();
var http = require('http');
var mysql = require('mysql');

var client = mysql.createConnection({
    user: 'guest_demo',
    password: '',
    database: 'movies'
});


router.route('/')
    .get(function (req,res) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = ['movie', 'title', req.param('query')+"%"];
        sql = mysql.format(sql, inserts);
        console.log(sql);
        client.query(sql,
           function (error, result) {
            console.log(req.param('query'));
            if (error) {
                console.log('error:'+ error);
                console.log('쿼리 문장에 오류가 있습니다.');
            } else {
                console.log(result.length);
                res.render('queryResult', {
                    data: result
                });
            }
        });
    });


module.exports = router;