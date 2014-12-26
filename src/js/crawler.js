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
imdb_crawler.prototype.requestMovieInfo = function(callback) {
	var self = this;

	req = http.request(this.options, function(res) {
		console.info('response');
		console.log('statusCode : '+res.statusCode);
		// console.log('headers :');
		// console.log(res.headers);

		if(res.statusCode == 301) {
			imdb_crawler.prototype.dealWithRedirection.call(self, res.headers, callback);
		}
		res.on('data', function(chunk) {	// occurs multiple time
			self.data += chunk.toString();
			// console.log('data: ');
			// console.log(chunk.toString());
		});
		res.on('end', function() {	// only once
			console.info(self.movieID + 'res end');
			if(callback) callback();
		});
	});
	req.end();
};
imdb_crawler.prototype.dealWithRedirection = function(headers, callback) {
	var url = require('url').parse(headers.location);
	this.options = {
		hostname: url.hostname,
		port: url.port,
		path: url.path,
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	this.requestMovieInfo.call(this, callback);
};

module.exports = imdb_crawler;