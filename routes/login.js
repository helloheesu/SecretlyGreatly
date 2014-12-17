var fs = require('fs');
var http = require('http');
var express = require('express');
var ejs = require('ejs');
var pool = require('../modules/database.js');
var crypto = require('crypto');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

var ensure = require('../modules/gateway.js');


var router = express.Router();

router.get('/',ensure, function (request, response, next) {
	response.render('login');
});

//
//router.get('/login', function (request, response, next) {
//	response.render('login');
//});

//router.get('/main', function (request, response, next) {
//	response.render('main');
//});


//
//router.get('/login', function (request, response, next) {
//	var email = request.param('email');
//	if(!email) {
//		console.log('no email');
//		response.render('login');
//		return;
//	}
//
//	pool.getConnection(function (error, connection) {
//		if(error) {
//			console.error(error);
//		}
//
//		console.log('yes email');
//
//		var sql = 'SELECT email FROM user WHERE email='+pool.escape(email);
//		connection.query(sql, function (error, result, fields) {
//			if(error) {
//				console.log('쿼리 문장에 오류가 있습니다.');
//				throw error;
//			} else {
//				var exists = false;
//				if(result[0]) {
//					console.log('이미 존재하는 이메일입니다.');
//					exists = true;
//				}
//				else {
//					console.log('존재하지 않는 이메일이다.');
//					exists = false;
//				}
//				response.send(exists);
//				response.end();
//			}
//		});
//	});
//});

module.exports = router;
// exports.ensureAuthenticated = ensureAuthenticated;
