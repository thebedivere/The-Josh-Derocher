// set up

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOerride = require('method-override');


// configuration

mongoose.connect('mongodb://root:stormbringer@127.0.0.1:27017');

app.use(express.static(__dirname + '/'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOerride());

app.get('*', function(req, res) {
        res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// listen
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening on port %s', port);
});