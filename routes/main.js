/**
 * Created by jjungmac on 2014. 12. 2..
 */


var express = require('express');
var router = express.Router();
//var signin = require('./signin');

/* GET home page. */


router.get('/', function (request, response, next) {
    // response.send(response.user);
    response.render('main');
});


module.exports = router;
