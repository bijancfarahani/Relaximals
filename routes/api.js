var User = require('../models/user');
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
          if(err)
            res.json({success: false, message:'username or email already exists'});

          else
            res.json({success: true, message:'user created'});

        });
      }
    });

    router.post('/authenticate', function(req,res) {
      User.findOne({username: req.body.username}).select('email username password').exec(function(err,user) {
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
            var token = jwt.sign({username: user.username, email: user.email},secretVar,{expiresIn: '24h'});
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

    return router;

};
