/**
 * Created by jjungmac on 2014. 11. 21..
 */

var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function (req, res) {
    res.render('index', {title: 'New'});
});

module.exports = router;
