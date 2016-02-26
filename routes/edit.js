var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('edit', { title: 'edit this page' });
 
});

module.exports = router;




