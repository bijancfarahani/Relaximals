var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var userSchema = mongoose.Schema({
    username: {type: String, unique: true, lowercase: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dateCreated: {type: Date, default: Date.now},
  /*  facebook: {
      id: String,
      token: String
    },
    google:  {
      id: String,
      token: String
    }*/
});
userSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password,null,null,function(err, hash) {
    if(err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
