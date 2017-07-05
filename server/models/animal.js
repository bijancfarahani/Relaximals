// Dependencies
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Defines the animal schema
var AnimalSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: false},
    details: {type: String, required: false},
    age: {type: String, required: false},
    numFavorites: {type: Number, min: 0, default: 0},
    picture: {type: Schema.Types.Mixed, required: false},
    morePictures: {type: Schema.Types.Mixed, required: false},
    createdAt: {type: Date, default: Date.now},
    ownerName: {
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

// Exports the aniamlSchema for use elsewhere.
module.exports = mongoose.model('Animal', AnimalSchema);
