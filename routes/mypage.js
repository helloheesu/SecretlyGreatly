//evaluate.log에서 정보를 받아서 mypage에 보여주는 코드
var express = require('express');
var mysql = require('mysql');
var client = mysql.createConnection({ //수정요
	user: 'root',
	password: '0525',
	'database': 'booklist'
});

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();

router.get('/', function (request, response, next) {
	// 아래 기존 코드 
	// client.query('SELECT comment FROM log;', function (error, result, fields) {
	client.query('SELECT num FROM log;', function (error, db_num_result, fields) {
		client.query('SELECT date FROM log;', function (error, db_date_result, fields) {
			client.query('SELECT movie_name FROM log;', function (error, db_movie_name_result, fields) {
				client.query('SELECT total_point FROM log;', function (error, db_total_result, fields) {
					client.query('SELECT favorite FROM log;', function (error, db_fav_point_result, fields) {
						client.query('SELECT comments FROM log;', function (error, db_comment_result, fields) {

	response.render('mypage', {num_result:db_num_result, date_result:db_date_result, movie_name_result:db_movie_name_result, total_result:db_total_result, fav_point_result:db_fav_point_result, comment_result:db_comment_result} );

						});
					});
				});
			});
		});
	});
});


module.exports = router;