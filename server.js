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
var animal       = require('./routes/animal')();
var router       = express.Router();
var appRoutes    = require('./routes/api')(router);
var User         = require('./models/user');
// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

// required for passport
 // use connect-flash for flash messages stored in session

// routes ======================================================================
//require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
/*static files=========================================================
app.route('/animal')
    .post(animal.post)
    .get(animal.getAll);
app.route('/animal/:id')
    .get(animal.getOne);
// launch ======================================================================
*/
app.listen(port);
console.log('The magic happens on port ' + port);
