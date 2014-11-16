var fs = require('fs');
var http = require('http');
var express = require('express');
var ejs = require('ejs');

var mysql = require('mysql');
// $ mysql -u root -pdb1004 ev_movie_test
var sql = mysql.createConnection({
	user: 'root',
	password: 'db1004',
	'database': 'ev_movie_test'
});

var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var router = express.Router();


router.get('/eval', function (request, response, next) {
	fs.readFile('evaluate.html', function (error, data) {
		console.log('loading eval.html');
		response.send(data.toString());
	});
});
router.post('/eval', function (request, response, next) {
	var movie_id = request.param('movie_id');
	var score = request.param('score');
	console.log("post"+movie_id);
	console.log("post"+score);
	sql.query('INSERT INTO score_info VALUES ('+movie_id+','+score+');', function (error, result, fields) {
		if(error) {
			console.log('you\'ve got wrong query');
		} else {
			if (result.affectedRows != 1) {
				console.log(result);
			} else {
				console.log("query ok");
			}
		}
	});
});

function makeNewInfoCard (movie_id, movie_title, score) {
	var evalInfo = document.createElement('tr');
	evalInfo.id = "eval_"+movie_id;
	var titleEle = document.createElement('td');
	titleEle.appendChild(document.createTextNode(movie_title));
	var scoreEle = document.createElement('td');
	scoreEle.appendChild(document.createTextNode(score));
	evalInfo.appendChild(titleEle);
	evalInfo.appendChild(scoreEle);
	document.getElementById('eval_info_table').appendChild(evalInfo);
}
router.get('/show', function (request, response, next) {
	sql.query('SELECT * FROM score_info;', function (error, result, fields) {
		if(error) {
			console.log('wrong query');
			return;
		}

		// response.writeHead(200, {"Content-Type": "text/plain"});
		// response.write(JSON.stringify(result));
		// response.end();
		console.log('hello');
		fs.readFile('show.html', 'utf8', function (error, data) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(ejs.render(data, {
				result: result
			}));
		});

		console.log('hi');
	});
	// response.writeHead(200, {"Content-Type": "text/html"});
	// response.write(body);
	// response.end();
	// fs.readFile('show.html', function (error, data) {
	// 	console.log('loading show.html');
	// 	response.send(data.toString());
	// });
});


app.use('/', router);

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});