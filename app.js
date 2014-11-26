var fs = require('fs');
var http = require('http');
var express = require('express');
// var async = require('async');
// var compression = require('compression');

var app = express();

var router = express.Router();
var bodyParser = require('body-parser');


var mysql = require('mysql');
// $ mysql -u root -pdb1004 test
var client = mysql.createConnection({
	user: 'root',
	password: 'tomntoms',
	'database': 'movies'
});

app.use(bodyParser.urlencoded());
// app.use(compression());
//app.use(express.static(__dirname + '/src'));

router.get('/', function (request, response) {
	fs.readFile('./src/login.html', function (error, data) {
		response.send(data.toString());
	});
});

router.get('/card', function (request, response) {
	fs.readFile('./src/login.html', function (error, data) {
		response.send(data.toString());
	});

});

app.use('/', router);
// app.use('/login', router);

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});

