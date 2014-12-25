var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compression = require('compression');

var routes = require('./routes/index');
var users = require('./routes/users');
var recommend = require('./routes/recommend');
var insert = require('./routes/insert');
var news = require('./routes/new');
var main = require('./routes/main');
var del = require('./routes/delete');
var signin = require('./routes/signin');
var evaluate = require('./routes/evaluate');

var app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /src
//app.use(favicon(__dirname + '/src/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

// app.use('/', main);
app.use('/', signin);
// app.use('/', main);
app.use('/users', users);
app.use('/recommend', recommend);
app.use('/insert', insert);
app.use('/new',news);
app.use('/main', main);
app.use('/delete', del);
app.use('/evaluate', evaluate);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
