var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    admin: { type: Boolean },
});

module.exports = mongoose.model('User', UserSchema);