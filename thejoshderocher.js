var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var showdown = require('showdown');
var jwt = require('jsonwebtoken');
var app = express();
var morgan = require('morgan');
app.use(morgan('dev'));
// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router();
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
    // find the user
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false
                , message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false
                    , message: 'Authentication failed. Wrong password.'
                });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                    success: true
                    , message: 'Enjoy your token!'
                    , token: token
                });
            }
        }
    });
});

apiRoutes.post('/create', function(req, res, next) {
    User.create(req.body, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
});
apiRoutes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false
                    , message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false
            , message: 'No token provided.'
        });
    }
});
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});
// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
//routes
var User = require('./models/user');
var post = require('./routes/post');
var chat = require('./routes/chat');
//var user = require('./routes/user');
var config = require('./config');
var port = process.env.PORT || 8080;
app.set('superSecret', config.secret);
app.use('/post', post);
app.use('/chat', chat);
//app.use('/user', user);
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/setup', function (req, res) {
    // create a sample user
    var josh = new User({
        name: 'admin'
        , password: 'password'
        , admin: true
    });
    // save the sample user
    nick.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
            success: true
        });
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            status: err.status
            , message: err.message
            , error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        status: err.status
        , message: err.message
        , error: {}
    });
});
var http = require('http');
var server = http.createServer(app);
server.listen(8000);
console.log('Server is listening on port 8000');
// MongoDB
var Db = require('mongodb').Db
    , MongoClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server
    , ReplSetServers = require('mongodb').ReplSetServers
    , ObjectID = require('mongodb').ObjectID
    , Binary = require('mongodb').Binary
    , GridStore = require('mongodb').GridStore
    , Grid = require('mongodb').Grid
    , Code = require('mongodb').Code
    , BSON = require('mongodb').BSON
    , assert = require('assert');
var db = new Db('josh', new Server('localhost', 27017));
// Fetch a collection to insert document into
db.open(function (err, db) {
    var collection = db.collection("blog_posts");
});
// mongoose setup
var mongoose = require('mongoose');
var database_uri = 'mongodb://localhost:27017/josh';
console.log(database_uri);
mongoose.connect(database_uri, function (err) {
    if (err) {
        console.log('Connection error', err);
    } else {
        console.log('Connection successful');
    }
});
// user set up
var port = process.env.PORT || 8000;
module.exports = app;
