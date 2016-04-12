var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Chat = require('../models/chat');

/* GET chats. */
router.get('/:limit', function(req, res, next) {
    Chat.find(function (err, chats) {
        if (err) return next(err);
        var chatLength = chats.length;
        var chatLimit = chatLength - req.params.limit;
        res.json(chats.slice(chatLimit, chatLength));
    });
});

// POST chat
router.post('/', function(req, res, next) {
    Chat.create(req.body, function(err, chat) {
        if (err) return next(err);
        res.json(chat);
    });
});

// GET chat by id
router.get('/:id', function(req, res, next) {
    Chat.findById(req.params.id, function (err, chat) {
        if (err) return next(err);
        res.json(chat);
    });
});
// PUT chat by id
router.put('/:id', function(req, res, next) {
    Chat.findByIdAndUpdate(req.params.id, req.body, function (err, chat) {
        if (err) return next(err);
        res.json(chat);
    });
});
// DELETE chat by id
router.delete('/:id', function(req, res, next) {
    Chat.findByIdAndRemove(req.params.id, req.body, function (err, chat) {
        if (err) return next(err);
        res.json(chat);
    });
});
module.exports = router;
