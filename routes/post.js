var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Blog = require('../models/blog');

/* GET blog listing. */
router.get('/', function(req, res, next) {
    Blog.find(function (err, blogs) {
        if (err) return next(err);
        res.json(blogs);
    });
});

// POST blog
router.post('/', function(req, res, next) {
    Blog.create(req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// GET /blog/id
router.get('/:id', function(req, res, next) {
    Blog.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
// PUT /blog/id
router.put('/:id', function(req, res, next) {
    Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
// DELETE /blog/id
router.delete('/:id', function(req, res, next) {
    Blog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
module.exports = router;
