/**
 * Created by jjungmac on 2014. 12. 2..
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var pool = require('../modules/database.js');


router.get('/:id', function (req, res) {
    pool.getConnection(function(err, connection) {
        connection.query('DELETE FROM moviedata WHERE movie_id=?', [req.param('id')], function (error, result) {
            console.log('DELETE Movie');
            connection.release();
            if (error) {
                console.log('쿼리 문장에 오류가 있습니다.');
                throw error;
            }
            res.redirect('/recommend');
        });
    });
});

module.exports = router;
