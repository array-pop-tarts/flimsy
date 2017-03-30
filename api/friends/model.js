let mongoose = require('mongoose');

let User = require('../users/model');

let FriendSchema = new mongoose.Schema({
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