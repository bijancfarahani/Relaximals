const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://hi:hi@ds145188.mlab.com:45188/relaximals', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
  	console.log('listening on 3000')
  })
})

var imageSearch = require("google-image-search-url-results");


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


/*imageSearch("dogs", function(images) {
	for (i in images) {
		app.get('/', function(req,res) {
			res.send("hello world")
})
	}
});
*/