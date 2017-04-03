// Dependencies
var mongoose  = require('mongoose');
var Animal = require('../models/animal');
var User   = require('../models/user');
// App routes
module.exports = function() {
    return {
        /*
         * Get route to retrieve all the animals.
         */
        getAll : function(req, res){
            //Query the DB and if no errors, send all the superheroes
            var query = Animal.find({});
            query.exec(function(err, animals){
                if(err) res.send(err);
                //If no errors, send them back to the client
                res.json(animals);

            });
        },
        /*
         * Post route to save a new animal into the DB.
         */
        post: function(req, res){
            console.log(req.body);
            var newAnimal = new Animal(req.body);
            //Save it into the DB.
            var owner = req.body.ownerName;
            var ownerEmail = req.body.ownerEmail;
            console.log('owner' + ownerEmail);
            User.findOneAndUpdate({'email': ownerEmail},{$push: {'animals':newAnimal._id}}, function(err, user) {
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
        },
        /*
         * Get a single animal based on id.
         */
        getOne: function(req, res){
            Animal.findById(req.params.id, function(err, animal){
                if(err) res.send(err);
                //If no errors, send it back to the client
                res.json(animal);
            });
        }
    }
};
