var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var client = mysql.createConnection({
		user: 'root',
		password: '0525',
		database : 'example'
});//윤서로컬 디비정보

/* GET home page. */


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});//이 부분 설명 필요 

//메인페이지에서 카드 이미지 불러오기 위한 코드
router.shows = function (request, response, next) {
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
};

module.exports = router;


