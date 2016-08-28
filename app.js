var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session')

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var signup = require('./routes/signup');
var login = require('./routes/login');

var apiKey = 'a5e95177da353f58113fd60296e1d250';
var userId = '24662369@N07';
var photodb = require('./routes/photoDatabase');
var mongoose = require('mongoose');

var url = 'mongodb://192.168.1.176:27017/spacex';

var app = express();

photodb.pullPhotos(apiKey, userId, function(err, db) {
    // console.log(assert.equal(null, err));
    // console.log(err, db);
    if (err)
        console.log(err);
    else
        console.log('Photo Database is being created');
});

// Create the database connection 
mongoose.connect(url);

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + url);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Add photo database to request for use in web app
app.use(function(req, res, next) {
    req.db = photodb.getPhotoDb();
    next();
});


app.use('/bootstrap', express.static(path.join(__dirname, 'public/bootstrap')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// app.use(session({
//     secret: 'keyswagger',
//     cookie: { maxAge: 3600000 },
//     resave: false,
//     saveUninitialized: true
// }));
app.use(cookieSession({
    secret: 'keyswagger',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/signup', signup);
app.use('/login', login);
app.use('/users', users);
app.use('/photos', photos);

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
