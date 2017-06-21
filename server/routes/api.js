var User = require('../models/user');
var Suggestion = require('../models/suggestion');
var jwt  = require('jsonwebtoken');
var secretVar = 'testSecret';
module.exports = function(router) {

    //Registration Route
    router.post('/users', function(req,res) {
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      if(req.body.username == null || req.body.username == "" ||
         req.body.password == null || req.body.password == "" ||
         req.body.email    == null || req.body.email    == "") {
        res.json({success: false, message:"ensure username, email, and password were provided"});
      }
      else {
        user.save(function(err) {
          if(err) {
            if(err.errors.email) {
              res.json({success:false,message:err.errors.email.message});
            }
            //res.json({success: false, message:err.errors.message});

          }
          else {
            res.json({success: true, message:'user created'});

          }

        });
      }
    });

    router.post('/authenticate', function(req,res) {
      User.findOne({username: req.body.username}).select('username password favorites').exec(function(err,user) {
        if(err) throw err;
        if(!user)
          res.json({success:false, message: 'could not authenticate user'});
        else if(user) {
          if(req.body.password) {
            var validPassword = user.comparePassword(req.body.password);
          }
          else {
            res.json({success:false,message:'no password given'});
          }
          if(!validPassword)
            res.json({success:false, message:'could not authenticate password'});
          else {
            console.log(user);
            var token = jwt.sign({username: user.username, _id: user._id, favorites: user.favorites},secretVar,{expiresIn: '24h'});
            res.json({success:true, message: 'user authenticated',token: token});
          }
        }
      });
    });


    router.use(function(req,res,next) {
      var token = req.body.token || req.body.query || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token,secretVar,function(err,decoded) {
          if(err) {
            res.json({success:false, message: 'token invalid'})
          }
          else {
            req.decoded = decoded;
            next();
          }
        })
      }
      else {
        res.json({success:false,message:'no token'});
      }
    });
    router.post('/me', function(req,res) {
      res.send(req.decoded);
    })
    router.post('/suggestion', function(req,res) {
      var suggestion = new Suggestion();
      suggestion.content = req.body.data;
      suggestion.save(function(err) {
        if(err)
          res.json({success: false, message:'error with suggestion'});
        else {
          res.json({success: true, message:'suggestion posted'});
        }
      });
    });
    return router;
};
