var http = require('http');
var cheerio = require('cheerio');

function movieCrawler(movieID) {
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
movieCrawler.prototype.requestMovieInfo = function(callback) {
	var self = this;

	req = http.request(this.options, function(res) {
		console.info(self.movieID + ' response');
		console.log('statusCode : '+res.statusCode);
		// console.log('headers :');
		// console.log(res.headers);
		if(res.statusCode==200) {
			res.on('data', function(chunk) {
				self.data += chunk.toString();
			});
			res.on('end', function() {
				console.info(self.movieID + ' res end');
				if(callback) callback();
			});
		}
	});
	req.end();
};
movieCrawler.prototype.dealWithRedirection = function(headers, callback) {
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
movieCrawler.prototype.parseData = function() {
	var $ = cheerio.load(this.data);

	var title = $('.header > [itemprop="name"]').text();
	title = title.replace(/(?:.+\s+")(.+)(?:"\s+\(original title\)\s+)/, '$1');
	console.log(title);
	var genre = $('[itemprop="genre"] > a').map(function() {
	    return $(this).text();
	}).get();
	var releaseDate = $("a[title='See all release dates']").text();
	var releaseYear;
	if(releaseDate) {
		// console.log('releaseDate : '+releaseDate);
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

module.exports.movieCrawler = movieCrawler;









function crewCrawler(movieID) {
	// got bored of 301.
	movieID = movieID.toString();
	for (; movieID.length < 7; ) { movieID = '0'+movieID; }

	this.movieID = movieID;
	this.options = {
		hostname: 'www.imdb.com',
		port: 80,
		path: '/title/tt'+this.movieID+'/fullcredits/',
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	this.data = "";
}
crewCrawler.prototype.requestCrewInfo = function(callback) {
	var self = this;

	req = http.request(this.options, function(res) {
		console.info(self.movieID + ' response');
		console.log('statusCode : '+res.statusCode);
		console.log('headers :');
		console.log(res.headers);
		if(res.statusCode==200) {
			res.on('data', function(chunk) {
				self.data += chunk.toString();
			});
			res.on('end', function() {
				console.info(self.movieID + ' crew res end');
				if(callback) callback();
			});
		}
	});
	req.end();
};
crewCrawler.prototype.parseData = function() {
	var $ = cheerio.load(this.data);

	var getParsedArray = function(docs) {
		var getParsedPeopleText = function(text) {
			return text.replace(/^\s+(.+[^\s])\s+$/, '$1');
		};
		var result = [];
		for (var i = 0; i < docs.length; i++) {
			var name = getParsedPeopleText($(docs[i]).find('.name a').text());
			var role = getParsedPeopleText($(docs[i]).find('.credit').text());
			result.push({name:name, role:role});
		}
		return result;
	};

	var directionDocs = $("h4:contains('Directed by')").next().find('tr');
	var directions = getParsedArray(directionDocs);
	var scenarioDocs = $("h4:contains('Writing Credits')").next().find('tr');
	var scenarios = getParsedArray(scenarioDocs);
	var musicDocs = $("h4:contains('Music by')").next().find('tr');
	var musics = getParsedArray(musicDocs);
	var cinemaDocs = $("h4:contains('Cinematography by')").next().find('tr');
	var cinemas = getParsedArray(cinemaDocs);
	this.crewData = {
		direction: directions,
		scenario: scenarios,
		music: musics,
		cinema: cinemas
	};
};

module.exports.crewCrawler = crewCrawler;
