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
			default:
				console.log('statusCode : '+res.statusCode);

		}
	});
	req.end();
};
imdb_crawler.prototype.dealWithRedirection = function(headers, callback) {
	var url = require('url').parse(headers.location);
	
	var movieID = url.path.match(/\d+/).toString();
	if(movieID) {
		console.info('change movieID to :'+movieID);
		this.movieID = movieID;	
	}

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
	var releaseDate = $("a[title='See all release dates']").text();
	var releaseYear;
	if(releaseDate) {
		console.log('releaseDate : '+releaseDate);
		// releaseDate = releaseDate.match(/\d+\s+\w+\s+\d{4}/)[0];
		// releaseYear = parseInt(releaseDate.slice(-4));
		releaseYear = releaseDate.match(/\d{4}/).toString();
		releaseYear = (releaseYear)? parseInt(releaseYear): null;
	}
	var posterSrc = $("img[title*='Poster']").attr('src');

	this.movieData = {
		title: title,
		genre: genre,
		year: releaseYear,
		poster: posterSrc
	};
};

module.exports = imdb_crawler;