const mongoose = require('mongoose'); // Nous appelons le module mongoose
const Schema = mongoose.Schema; // Nous créons un schéma mongoose

var User = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', User, 'users');
