// Dependencies
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Defines the superhero schema
var AnimalSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: false},
    color: {type: String, required: false},
    breed: {type: String, required: false},
    details: {type: String, required: false},
    age: {type: String, required: false},
    picture: {type: Schema.Types.Mixed, required: false},
    morePictures: {type: Schema.Types.Mixed, required: false}, // this is not required
    createdAt: {type: Date, default: Date.now},
    owner: {
      type: String,
      required: true
    }
});

// Sets the createdAt parameter equal to the current time
AnimalSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Exports the SuperheroSchema for use elsewhere.
module.exports = mongoose.model('Animal', AnimalSchema);
