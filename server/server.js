var express      = require('express');
var app          = express();
var port         = process.env.PORT || 3000;
var mongoose     = require('mongoose');
var passport     = require('passport');
var social       = require('./config/passport')(app,passport);
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var path         = require('path');
var configDB     = require('./config/database.js');
var apiRoutes    = require('./routes/api')(express.Router());
var animalRoutes = require('./routes/animal')(express.Router());
var User         = require('./models/user');
// dB configuration ===============================================================
mongoose.Promise = global.Promise; //Fixes runtime deprecated error
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// routes ======================================================================
app.use(express.static(__dirname + '/../public'));

app.use('/animal',animalRoutes);
app.use('/api',apiRoutes);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});
// launch ======================================================================

app.listen(port);
console.log('The magic happens on port ' + port);
