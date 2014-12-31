var express = require('express');
var mysql = require('mysql');
var pool = require('../modules/database.js');

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();

router.get('/', function (request, response, next) {
	console.log('SELECT title FROM movie where mid=' + request.param('id'));
	pool.getConnection(function(error, connection) {
		console.error(error);
		connection.query('SELECT title FROM movie where mid=' + request.param('id'), function (error, db_title_result, fields) {
			console.log(db_title_result);
			if (error) console.log('movie_title error');
			connection.query('SELECT c.name, c.profile_url FROM crew as c ,participate as p where p.cid = c.cid and p.tid = 1;', function (error, db_director_result, fields) {
				if (error) console.log('director error');
				connection.query('SELECT c.name, c.profile_url FROM crew as c ,participate as p where p.cid = c.cid and p.tid = 3;', function (error, db_actor_result, fields) {
					if (error) console.log('actor error');
					connection.query('SELECT c.name, c.profile_url FROM crew as c ,participate as p where p.cid = c.cid and p.tid = 2;', function (error, db_story_result, fields) {
						if (error) console.log('story error');
						connection.query('SELECT c.name, c.profile_url FROM crew as c ,participate as p where p.cid = c.cid and p.tid = 4;', function (error, db_music_result, fields) {
							if (error) console.log('music error');
							connection.query('SELECT c.name, c.profile_url FROM crew as c ,participate as p where p.cid = c.cid and p.tid = 5;', function (error, db_visual_result, fields) {
								if (error) console.log('visual error');
								connection.release();
								response.render('more_evaluation', {
									title_result: db_title_result,
									director_result: db_director_result,
									actor_result: db_actor_result,
									story_result: db_story_result,
									music_result: db_music_result,
									visual_result: db_visual_result
								});
							});
						});
					});
				});
			});
		});
	});
});

module.exports = router;