var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
    title:  { type: String },
    body: { type: String },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);


