var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Josh Derocher: Blog' });
});
router.get('/defaultsite', function(req, res, next) {
  res.render('index', { title: 'Josh Derocher: Blog' });
});

module.exports = router;




