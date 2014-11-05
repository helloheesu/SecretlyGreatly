var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);

app.get('/', function (request, response) { });
app.get('/login', function (request, response) { });
app.post('/login', function (request, response) { });

http.createServer(app).listen(52273, function () {
	console.log('Server running');
});