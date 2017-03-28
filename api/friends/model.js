var mongoose = require('mongoose');

var User = require('../users/model');

var FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Friend', FriendSchema);