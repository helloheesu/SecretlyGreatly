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









function participationCrawler(movieID) {
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
participationCrawler.prototype.requestParticipationInfo = function(callback) {
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
				console.info(self.movieID + ' participation res end');
				if(callback) callback();
			});
		}
	});
	req.end();
};
participationCrawler.prototype.parseData = function() {
	var $ = cheerio.load(this.data);
	var removeSpaces = function(text) {
		return text.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
	};
	var getParsedPersonInfo = function(typetext) {
		var docs = $("h4:contains("+typetext+")").next().find('tr');
		return (function getParsedArray(docs) {
			var result = [];
			for (var i = 0; i < docs.length; i++) {
				var path = $(docs[i]).find('.name a').attr('href');
				if(!path) continue;
				cID = path.replace(/^.+\/nm(\d{7}).+$/, '$1');
				var role = removeSpaces($(docs[i]).find('.credit').text());
				var creditOrder = path.match(/\d+$/)[0];
				result.push({cID:cID, role:role, creditOrder:creditOrder});
			}
			return result;
		})(docs);
	};
	var getParsedActorInfo = function() {
		var actDocs = $("h4:contains('Cast')").next().find('tr.odd, tr.even');
		var result = [];
		for (var i = 0; i < actDocs.length; i++) {
			var path = $(actDocs[i]).find("[itemprop='name']").parent().attr('href');
			if(!path) continue;
			cID = path.replace(/^.+\/nm(\d{7}).+$/, '$1');
			var role = removeSpaces($(actDocs[i]).find(".character").text());
			var creditOrder = path.match(/\d+$/)[0];
			result.push({cID:cID, role:role, creditOrder:creditOrder});
		}
		return result;
	};

	this.participationData = {
		direction: getParsedPersonInfo('Directed by'),
		scenario: getParsedPersonInfo('Writing Credits'),
		music: getParsedPersonInfo('Music by'),
		cinema: getParsedPersonInfo('Cinematography by'),
		acting: getParsedActorInfo()
	};
};

module.exports.participationCrawler = participationCrawler;









function crewCrawler(crewID) {
	// got bored of 301.
	crewID = crewID.toString();
	for (; crewID.length < 7; ) { crewID = '0'+crewID; }

	this.crewID = crewID;
	this.options = {
		hostname: 'www.imdb.com',
		port: 80,
		path: '/name/nm'+this.crewID+'/',
		method: 'GET',
		headers: {'Accept-Language':'en'}
	};
	this.data = "";
}
crewCrawler.prototype.requestCrewInfo = function(callback) {
	var self = this;

	req = http.request(this.options, function(res) {
		console.info(self.crewID + ' response');
		console.log('statusCode : '+res.statusCode);
		// console.log('headers :');
		// console.log(res.headers);
		if(res.statusCode==200) {
			res.on('data', function(chunk) {
				self.data += chunk.toString();
			});
			res.on('end', function() {
				console.info(self.crewID + ' crew res end');
				if(callback) callback();
			});
		}
	});
	req.end();
};
crewCrawler.prototype.parseData = function() {
	var $ = cheerio.load(this.data);

	var name = $('.header > [itemprop="name"]').text();
	var profileSrc = $('#name-poster').attr('src');

	this.crewData = {
		name: name,
		profile: profileSrc
	};
};

module.exports.crewCrawler = crewCrawler;