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
		if(res.statusCode == 301) {
			imdb_crawler.prototype.dealWithRedirection.call(self, res.headers);
		}
		res.on('data', function(chunk) {
			this.data += chunk.toString();
		});
		res.on('end', function() {
			self.data = this.data;
		});
	});
	req.end();
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