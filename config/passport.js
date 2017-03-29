var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
var session          = require('express-session');
var jwt  = require('jsonwebtoken');
var secretVar = 'testSecret';

module.exports = function(app,passport) {
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(session({secret: secretVar,resave: false,saveUninitialzied: true,cookie:{secure: false} }));


  passport.serializeUser(function(user,done) {
    token = jwt.sign({username: user.username, email: user.email},secretVar,{expiresIn: '24h'});
    done(null,user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err,user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: '447016842355234',
    clientSecret: '2eb7ea8fbf47062c84053546ad0833b9',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id','photos','emails', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {

      User.findOne({email: profile._json.email}).select('username password email').exec(function(err,user) {
        if(err) done(err);
        if(user && user != null) {
          done(null,user);
        }
        else {
          done(err);
        }
      })
    }
  ));
  app.get('/auth/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/login'}),function(req,res) {
    res.redirect('/facebook/' + token);
  });
  app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));

  return passport;
}
