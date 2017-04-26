var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var userSchema = mongoose.Schema({
    username: {type: String, unique: true, lowercase: true},
    password: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    dateCreated: {type: Date, default: Date.now},
    animals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal'
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal'
    }],
});
userSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next(); // If password was not changed or is new, ignore middleware

    // Function to encrypt password
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err); // Exit if error is found
        user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
        next(); // Exit Bcrypt function
    });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
