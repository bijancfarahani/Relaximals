var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
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
        //TODO: create new user if one is not found
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

  passport.use(new TwitterStrategy({
      consumerKey: '29VMlZLe7yJLNOjLacEsx09Sz',
      consumerSecret: 'JlCg12O00Gn4i1PG2nIZEnMAKZrwv03RM6nlK9Nyq0O56Q10ko',
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({email: profile.emails[0].value}).select('username password email').exec(function(err,user) {
        //TODO: create new user if one is not found
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

  passport.use(new GoogleStrategy({
    clientID: '142136934809-oaf0p7jol48j89p1uj49be25ekh2ojec.apps.googleusercontent.com',
    clientSecret: '4Jq12kwhwPlDYXRjY7650jc7',
    callbackURL: "http://www.localhost:3000/auth/google/callback"
  },
  function(accessToken,refreshToken, profile, done) {
    //change to google findOne
    User.findOne({email: profile.emails[0].value}).select('username password email').exec(function(err,user) {
      //TODO: create new user if one is not found
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

  app.get('/auth/facebook', passport.authenticate('facebook',{scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/login'}),
    function(req,res) {
      res.redirect('/facebook/' + token);
  });

  app.get('/auth/twitter',passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
    res.redirect('/twitter/' + token);
  });

  app.get('/auth/google',passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','profile','email'] }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/google/' + token);
    });


  return passport;
}
