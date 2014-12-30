// 모듈추출
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var http = require('http');
var express = require('express');

// 데이터베이스와 연결
var client = mysql.createConnection({
		user: 'root',
		password: '0525',
		database : 'example'
});
// 서버를 생성
var app = express();
// app.use(app.router);
var router = express.Router();

// 서버를 실행 + *추가 확인할 것*
http.createServer(app).listen(52273, function () {
	console.log('Server running~~');
})

// 코드 추가 
router.get('/shows', function (request, response, next) {
	client.query('SELECT movie_img_url from moviedata;', function (error, result, fields) {
		if(error) {
			console.log('wrong query');
			return;
		}
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(JSON.stringify(result));
		response.end();

		console.log('hi');
	});
});
app.use('/', router);
// client.query('select * from sample ')