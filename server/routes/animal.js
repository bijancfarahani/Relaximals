// Dependencies
var mongoose  = require('mongoose');
var Animal = require('../models/animal');
var User   = require('../models/user');
// App routes
module.exports = function(router) {
        /*
         * Get route to retrieve all the animals.
         */
        router.route('/gallery')
          .get(function(req, res){
            //Query the DB and if no errors, send all the animals
            var query = Animal.find({});
            query.exec(function(err, animals){
                if(err) res.send(err);
                //If no errors, send them back to the client
                res.json(animals);
            });
          })
          /*
          * Post route to save a new animal into the DB.
          */
          router.post('/addAnimal',function(req, res){
            var newAnimal = new Animal(req.body);
            //Save it into the DB.
            console.log(req.body);
            var owner= req.body.ownerName;
            User.findOneAndUpdate({'username': owner},{$push: {'animals':newAnimal._id}}, function(err, user) {
              if(err)
                res.send(err);
            });
            newAnimal.save(function(err){
                if(err)
                    res.send(err);
                //If no errors, send it back to the client
                else
                    res.json(req.body);
            });
          })
        /*
        * Get a single animal based on id.
        */
        router.get('/:id',function(req, res){
            Animal.findById(req.params.id, function(err, animal){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(animal);
            });
        })
        router.post('/addFavorite',function(req, res) {
          User.findOneAndUpdate({'username': req.body.username},{$push: {'favorites':req.body.animal._id}}, function(err, user) {
            if(err) return err;
          });
          Animal.findById(req.body.animal._id, function(err, animal) {
            if(err) res.send(err);
            animal.numFavorites++;
            animal.save(function(err) {
              if(err) res.send(err);
              else {
                res.json(animal);
              }
            });
          });
        })
        router.post('/removeFavorite', function(req,res) {
          User.findOneAndUpdate({'username': req.body.username},{$pull: {'favorites': req.body.animal._id}}, function(err, user) {
            if(err) return err;
          });
          Animal.findById(req.body.animal._id, function(err, animal) {
            if(err) res.send(err);
            animal.numFavorites--;
            animal.save(function(err) {
              if(err) res.json(err);
              else {
                res.json(animal);
              }
            });
          });
        })
        router.post('/checkFavorite', function(req,res) {
          User.findOne({'username': req.body.username}, 'favorites', function(err, user) {
            var foundBool = false;
            if(err)  {
              res.send(err);
            }
            if(user.favorites.length == 0)
              res.json(foundBool);
            for(var i = 0; i < user.favorites.length; i++) {
              if(user.favorites[i] == req.body.animalID) {
                foundBool = true;
              }
              if(i == user.favorites.length - 1) {
                res.json(foundBool);
              }
            }
          });
        })

        router.post('/myAnimals', function(req,res) {
          User.findOne({'username': req.body.username}, 'animals', function(err,user) {
            if(err) {
              res.send(err);
            }
            try {
              var ids = user.animals;
              Animal.find({'_id': { $in: ids }}, function(err, animals) {
                if(err) return err;
                res.json(animals);
              });
            }
            catch (err){
              console.log('user is null(no uploaded animals)');
              res.json({success: true,message: 'No uploaded animals'});
            }
          });
        })
        router.post('/myFavorites', function(req,res) {
          User.findOne({'username': req.body.username}, 'favorites', function(err,user) {
            if(err) {
              res.send(err);
            }
            try {
              var ids = user.favorites;
              Animal.find({'_id': { $in: ids }}, function(err, animals) {
                if(err) return err;
                res.json(animals);
              });
            }
            catch (err){
              console.log('user is null(no uploaded animals)');
              res.json({success: true,message: 'No uploaded animals'});
            }
          });
        });
        router.post('/deleteAnimal', function(req,res) {
          User.findOneAndUpdate({'username': req.body.username},{$pull: {'animals': req.body.animal._id}}, function(err, user) {
            if(err) res.json({success: false});
          });
          Animal.findByIdAndRemove(req.body.animal._id, function(err, response) {
            if(err) return err;
            res.json({success: true, message: 'animal removed'});
          });
        })
        return router;
      }
