var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function (req, res) {
    res.redirect('/evaluate_crew?id='+ req.param('id'));
});

module.exports = router;
