var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    message: {
        type: String
    },
    userName: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);
