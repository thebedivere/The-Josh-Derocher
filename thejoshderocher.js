var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var showdown  = require('showdown');
var jwt    = require('jsonwebtoken');
var app = express();
// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());


//routes

var post = require('./routes/post');
var user = require('./routes/user');
var config = require('./config');
app.set('superSecret', config.secret);
app.use('/post', post);
app.use('/user', user);

app.get('/', function (req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
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
        status: err.status,
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
      status: err.status,
    message: err.message,
    error: {}
  });
});

var http = require('http');
var server = http.createServer(app);
server.listen(8000);
console.log('Server is listening on port 8000');


// MongoDB
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').BSON,
    assert = require('assert');

var db = new Db('josh', new Server('localhost', 27017));
// Fetch a collection to insert document into
db.open(function(err, db) {
  var collection = db.collection("blog_posts");
  // Insert a single document
  collection.insert({hello:'world_no_safe'});

  // Wait for a second before finishing up, to ensure we have written the item to disk
  setTimeout(function() {

    // Fetch the document
    collection.findOne({hello:'world_no_safe'}, function(err, item) {
      assert.equal(null, err);
      assert.equal('world_no_safe', item.hello);
      db.close();
    })
  }, 100);
});

// mongoose setup
var mongoose = require('mongoose');
var database_uri = 'mongodb://localhost:27017';
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