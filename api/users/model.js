/**
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);