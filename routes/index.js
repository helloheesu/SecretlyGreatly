var fs = require('fs');
var http = require('http');

var express = require('express');
var ejs = require('ejs');


var router = express.Router();

var ensure = require('../modules/gateway.js');

/* GET home page. */
router.get('/',ensure,
    function(req, res) {
      res.redirect('/main');
    });


module.exports = router;
