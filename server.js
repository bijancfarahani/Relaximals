var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var path         = require('path');
var configDB = require('./config/database.js');
var animal   = require('./routes/animal')();

// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//static files=========================================================
app.use(express.static(__dirname + '/public')); 

app.route('/animal')
    .post(animal.post)
    .get(animal.getAll);
app.route('/animal/:id')
    .get(animal.getOne);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);