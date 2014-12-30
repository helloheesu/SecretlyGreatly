//평가하기페이지에서 별점+코멘트를 쓰고 제출을 하면 디비에 넣어주는 코드 

var fs = require('fs');
var http = require('http');
var express = require('express');
var ejs = require('ejs');
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


// router.get('/evaluate', function (request, response, next) {
// 	response.render('more_evaluation');
// });
router.post('/', function (request, response, next) {
	
	(function sendComment(){
		var comment = request.param('comment');//파라미터를 받은 후 웹에 보여줌. <textarea id="comment" rows="50" cols="70" name=""></textarea> 이 부
		console.log('comment is : ', comment);

		var statement = 'INSERT INTO log (comment) VALUES("'+comment+'");'; //수정요 
		console.log('statement:'+statement);
		client.query(statement, function (error, result, fields) {
		if (result) {
			console.log('result:'+result);
		}
		response.redirect('/');
		});
	})();
	
	
	(function sendScore(){

		var star =[]; 
		star[0] = request.param('Total_score');
		star[1] = request.param('Director_score');
		star[2] = request.param('Story_score');
		star[3] = request.param('Act_score');
		star[4] = request.param('Music_score');
		star[5] = request.param('Visual_score');
		console.log(star[0]);
		console.log(request.param);


		var statement = 'INSERT INTO star (score) VALUES("'+star[0]+'");';

		client.query(statement, function (error, result, fields) {
			if (result) {
			console.log('result:'+result);
			}
			response.redirect('/');
		});
	});
});




module.exports = router;