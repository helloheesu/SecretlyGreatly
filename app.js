var fs = require('fs');
var http = require('http');
var express = require('express');

var mysql = require('mysql');
// $ mysql -u root -pdb1004 test
var client = mysql.createConnection({
	user: 'root',
	password: 'tomntoms',
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
				if(result[0].pw === pass) {console.log('RightAuth');return true;}
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

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});