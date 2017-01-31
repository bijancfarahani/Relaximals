var mongoose = require('mongoose');

// define the schema for our user model
var imageSchema = mongoose.Schema({
    image   : String,
    Species : String,
    tags    : [String]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Images', imageSchema);