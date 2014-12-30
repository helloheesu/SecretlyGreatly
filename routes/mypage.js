//jjungapp에 추가하기 
var express = require('express');
var mysql = require('mysql');
var client = mysql.createConnection({ //수정요
	user: 'root',
	password: '',
	'database': 'movies'
});

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();


router.get('/', function (request, response, next) {
	client.query('SELECT comment FROM log;', function (error, result, fields) {
		if(error) {
			console.log('wrong query');
			return;
		}
		console.log('hello '+result.length);
		response.render('mypage', {result:result});
		console.log('hi');
	});
});

module.exports = router;