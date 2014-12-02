var fs = require('fs');
var http = require('http');
var express = require('express');

var ejs = require('ejs');
var mysql = require('mysql');
// $ mysql -u root -pdb1004 test
var client = mysql.createConnection({
	user: 'root',
	password: 'db1004',
	'database': 'test'
});


// client.query('SELECT * FROM user', function (error, result, fields) {
// 	if(error) {
// 		console.log('쿼리 문장에 오류가 있습니다.');
// 	} else {
// 		console.log(result);
// 		console.log(fields);
// 	}
// });

var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
// app.use(express.cookieParser());
// app.use(express.bodyParser());
var router = express.Router();

router.get('/', function (request, response, next) {
	if (request.cookies.auth) {
		response.send('<h1>Login Success</h1>');
	} else {
		response.redirect('/login');
	}
});
router.get('/login', function (request, response, next) {
	fs.readFile('login.html', function (error, data) {
		response.send(data.toString());
	});
});
router.post('/login', function (request, response, next) {
	var login = request.param('login');
	var password = request.param('password');
	console.log('login request : ',login, password);
	handleAuth(login, password, response);
	// if (isRightAuth(login, password)===true) {
	// 	console.log('안녕안녕');
	// 	response.cookie('auth', true);
	// 	response.redirect('/');
	// } else {
	// 	console.log('hihihihihihihi');
	// 	response.redirect('/login');
	// }
});

function isRightAuth(username, pass) {
	client.query('SELECT * FROM user WHERE id="'+username+'";', function (error, result, fields) {
		console.log('isRightAuth called');
		if(error) {
			console.log('쿼리 문장에 오류가 있습니다.');
			return false;
		} else {
			if(result[0]) {
				console.log("has result");
				if(result[0].pw == pass) {console.log('RightAuth');return true;}
				else {console.log('Wrong pw');return false;}
			} else {
				console.log("no result");
				return false;
			}
		}
		console.log('hi');
		return false;
	});
}

function handleAuth(username, pass, response) {
	client.query('SELECT * FROM user WHERE id="'+username+'";', function (error, result, fields) {
		console.log('isRightAuth called');
		if(error) {
			console.log('쿼리 문장에 오류가 있습니다.');
			response.redirect('/login');
		} else {
			if(result[0]) {
				console.log("has result");
				if(result[0].pw == pass) {
					console.log('RightAuth');
					response.cookie('auth', true);
					response.redirect('/');
				}
				else {
					console.log('Wrong pw');
					response.redirect('/login');
				}
			} else {
				console.log("no result");
				response.redirect('/login');
			}
		}
		console.log('hi');
		// response.redirect('/login');
	});
}

app.use('/', router);
// app.use('/login', router);
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



http.createServer(app).listen(52273, function () {
	console.log('Server running');
});