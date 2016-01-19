var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var showdown  = require('showdown');
var jwt    = require('jsonwebtoken');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//routes
var routes = require('./routes/index');
var blog = require('./routes/blog');
var edit = require('./routes/edit');
var post = require('./routes/post');
var user = require('./routes/user');
var config = require('./config');
app.set('superSecret', config.secret);
app.use('/', routes);
app.use('/post', post);
app.use('/blog', blog);
app.use('/edit', edit);
app.use('/user', user);


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
var http = require('http');
var server = http.createServer(app);
server.listen(8000);



// mongoose setup
var mongoose = require('mongoose');

var os = require('os');
var database_uri;
console.log(os.hostname().indexOf("local") > -1);

if(os.hostname().indexOf("local") > -1)
  database_uri = "mongodb://remote/test";
else
  database_uri = "mongodb://root:stormbringer@127.0.0.1:27017";

console.log(database_uri);

mongoose.connect(database_uri, function(err) {
    if(err) {
        console.log('Connection error', err);
    } else {
        console.log('Connection successful');
    }
});
// user set up

var port = process.env.PORT || 8000;




module.exports = app;
