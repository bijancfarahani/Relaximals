// Dependencies
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Defines the superhero schema
var SuggestionSchema = new Schema({
    content: String,
    createdAt: {type: Date, default: Date.now}
});

// Exports the SuperheroSchema for use elsewhere.
module.exports = mongoose.model('Suggestion', SuggestionSchema);
