/**
 * Created by jjungmac on 2014. 12. 2..
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


router.get('/:id', function (req, res) {
    client.query('DELETE FROM moviedata WHERE movie_id=?', [req.param('id')], function (error, result) {
        console.log('DELETE Movie');
        if (error) {
            console.log('쿼리 문장에 오류가 있습니다.');
        } else {
            res.redirect('/recommend');
        }
    });
});
module.exports = router;
