var express = require('express');
var router = express.Router();
var bodyParser  = require('body-parser');
var jwt    = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/user');
var app = express();
/* GET user listing. */
router.get('/show', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

// POST user
router.post('/authenticate', function(req, res, next) {
  User.findOne({
       name: req.body.name
  },function(err, user) {
      console.log('body.name: ' + req.body.name)
    if (err) throw err;
    if (!user) {
        console.log('User: ' + user);
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
            foo: 'bar'}, 'shhh');
        };
    };

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      });
});
// verify token

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token. Sorry dude.'});
            } else {
                req.decoded = decoded ;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;

