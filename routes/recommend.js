/**
 * Created by jjungmac on 2014. 11. 12..
 */
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');

var client = mysql.createConnection({
    user: 'root',
    password: 'tomntoms',
    'database': 'movies'
});

var router = express.Router();

router.get('/users', function (req, res) {
    client.query('DELETE FROM products WHERE id=?', [req.param('id')], function () {
    });
});


router.get('/edit/:id', function (req,res) {
    res.render('insert');
});
router.post('/edit/:id', function (req,res) {});


/* GET home page. */
router.get('/', function(req, res) {
    console.log("in the routes");
    client.query('SELECT * FROM moviedata WHERE movie_id between 0 AND 20;', function (error, result, fields) {
            console.log('loadMovie called');
            if (error) {
                console.log('쿼리 문장에 오류가 있습니다.');
            } else {
                console.log(result.length);
                res.render('recommendation', {
                    data: result
            });
        }
    });
});

module.exports = router;
