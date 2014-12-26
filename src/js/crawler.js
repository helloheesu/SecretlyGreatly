var http = require('http');
var fs = require('fs');

function imdb_crawler(movieID) {
	this.movieID = movieID;
	this.options = {
		hostname: 'www.imdb.com',
		// hostname: 'www.imdb.com/title/tt1',
		port: 80,
		path: '/title/tt'+this.movieID+'/',
		// path: '/title/tt'+'0000001'+'/',
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	// console.log(this.options);
	this.data = "";
}
imdb_crawler.prototype.requestMovieInfo = function() {
	// console.log("this.data");
	// console.log(this.data);
	var self = this;

	req = http.request(this.options, function(res) {
		if(res.statusCode == 301) {
			imdb_crawler.prototype.dealWithRedirection.call(self, res.headers);
		}
		// console.log('res');
		// console.log(res.statusCode);
		// console.log(res.headers);
		res.on('data', function(chunk) {
			// console.log('yes data');
			this.data += chunk.toString();
			// imdb_crawler.prototype.appendData.call(self, chunk.toString());
		});
		res.on('end', function() {
			// console.log('end');
			// console.log(this.data);
			self.data = this.data;
			self.logData.call(self);
		});
	});
	// console.log('req');
	// console.log(req);
	req.end();
};

imdb_crawler.prototype.dealWithRedirection = function(headers) {
	var url = require('url').parse(headers.location);
	// console.log('redicrection headers:');
	// console.log(url);
	this.options = {
		hostname: url.hostname,
		port: url.port,
		path: url.path,
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	// console.log('change options:');
	// console.log(this.options);
	this.requestMovieInfo.call(this);
};

imdb_crawler.prototype.appendData = function(data) {
	this.data += data;
};
imdb_crawler.prototype.logData = function(data) {
	console.log(this.data);
};


// var m1 = new imdb_crawler(1);
// console.log('m1:');
// console.log(m1.options);	// {path:/tt1}
// console.log(m1.data);		// ""
// console.log(m1.req);		// undefined (private)

// console.log('new test');
// m1.requestMovieInfo();
// m1.requestMovieInfo.call(m1);
// console.log(m1.data);



for (var i = 0; i < 200; i++) {
	var c = new imdb_crawler(i);
	c.requestMovieInfo.call(c);
}