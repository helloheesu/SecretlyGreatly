var fs = require('fs');
var http = require('http');
var express = require('express');

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
	if (login == 'rint' && password == '1234') {
		response.cookie('auth', true);
		response.redirect('/');
	} else {
		response.redirect('/login');
	}
});

app.use('/', router);
// app.use('/login', router);

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});