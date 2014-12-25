/**
 * Created by jjungmac on 2014. 11. 13..
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
    .post(function (req,res) {
        var body = req.body;
        client.query('INSERT INTO moviedata (movie_title,movie_img_url) VALUES (? , ?)',
            [body.title, body.img_url], function () {
                res.redirect('/recommend');
            });
    })
    .get(function (req,res) {
        res.render('insert');
    });



module.exports = router;
