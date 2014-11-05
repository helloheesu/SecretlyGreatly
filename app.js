var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
// app.use(express.cookieParser());
// app.use(express.bodyParser());
var router = express.Router();
// app.use(app.router);

router.get('/', function (request, response) { console.log('hi'); });
router.get('/login', function (request, response) { });
router.post('/login', function (request, response) { });

app.use('/', router);

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});