var http = require('http');
var cheerio = require('cheerio');

function imdb_crawler(movieID) {
	// got bored of 301.
	movieID = movieID.toString();
	for (; movieID.length < 7; ) { movieID = '0'+movieID; }

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
		console.info(self.movieID + ' response');
		console.log('statusCode : '+res.statusCode);
		// console.log('headers :');
		// console.log(res.headers);
		switch(res.statusCode) {
			case 200:
				res.on('data', function(chunk) {
					self.data += chunk.toString();
				});
				res.on('end', function() {
					console.info(self.movieID + ' res end');
					if(callback) callback();
				});
				break;
			case 301:
				imdb_crawler.prototype.dealWithRedirection.call(self, res.headers, callback);
				break;
			default:
				console.log('statusCode : '+res.statusCode);

		}
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
imdb_crawler.prototype.parseData = function() {
	var $ = cheerio.load(this.data);

	var title = $('.header > [itemprop="name"]').text();
	var genre = $('[itemprop="genre"] > a').map(function() {
	    return $(this).text();
	}).get();
	var releaseDate = $("a[title='See all release dates']").text().match(/\d{2}\s+\w+\s+\d{4}/)[0];
	var releaseYear = releaseDate.slice(-4);
	var posterSrc = $("img[title*='Poster']").attr('src');

	this.movieData = {
		title: title,
		genre: genre,
		year: releaseYear,
		poster: posterSrc
	};
};

module.exports = imdb_crawler;