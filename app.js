var fs = require('fs');
var http = require('http');
var express = require('express');

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
// app.use(app.router);

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
	console.log('hello');
	console.log(login, password);
	console.log('abcd');
	// console.log(request, body);
	console.log('5678');
	if (isRightAuth(login, password)) {
		response.cookie('auth', true);
		response.redirect('/');
	} else {
		response.redirect('/login');
	}
});

function isRightAuth(username, pass) {
	client.query('SELECT pw FROM user WHERE id="'+username+'";', function (error, result, fields) {
		console.log('SELECT pw FROM user WHERE id="'+username+'";');

		// if(error) {
			console.log('쿼리 문장에 오류가 있습니다.');

		// } else {
			// console.log(result.pw);
			console.log('-=====error');
			console.log(error);
			console.log('-=====result');
			console.log(result);
			console.log('wiufhwqf');
			console.log(result[0].pw);
			if(result[0].pw == '1234') {
				console.log('2345q3453');
				console.log('안녕');
			}
			// console.log('-=====fields');
			// console.log(fields);
		// }
			console.log('hi');
		return true;
	});
}

app.use('/', router);
// app.use('/login', router);

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});