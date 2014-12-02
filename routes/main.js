/**
 * Created by jjungmac on 2014. 12. 2..
 */


var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function (req, res) {
    res.render('main');
});

module.exports = router;
