var http = require('http');

function imdb_crawler(movieID) {
	this.movieID = movieID;
	this.options = {
		hostname: 'www.imdb.com',
		port: 80,
		path: '/title/tt'+this.movieID+'/',
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	this.data = "";
}
imdb_crawler.prototype.requestMovieInfo = function() {
	var self = this;

	req = http.request(this.options, function(res) {
		console.log('response');
		console.log(res.statusCode);
		// console.log(res.headers);
		if(res.statusCode == 301) {
			imdb_crawler.prototype.dealWithRedirection.call(self, res.headers);
		}
		res.on('data', function(chunk) {	// occurs multiple time
			// console.log('data 2');
			self.data += chunk.toString();
			// console.log(self.data);
		});
		res.on('end', function() {	// only once
			console.log('res end');
		});
	});
	req.end();
	req.on('end', function() {	// never occurs
		// console.log('req end');
		// console.info(self.movieID+' done!');
	});
};
imdb_crawler.prototype.dealWithRedirection = function(headers) {
	var url = require('url').parse(headers.location);
	this.options = {
		hostname: url.hostname,
		port: url.port,
		path: url.path,
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	this.requestMovieInfo.call(this);
};

module.exports = imdb_crawler;