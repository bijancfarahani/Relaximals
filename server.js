const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))

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

app.put('/animals', (req, res) => {
  console.log(req.body.animal)
  var url;
  imageSearch("Dog", function(images) {
    url = images[Math.floor(Math.random() * images.length)] 
  })
  res.method = 'get'
  res.redirect(url)
})

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

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Bijan'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.json('A darth vadar quote got deleted')
  })
})

/*
imageSearch("dick", function(images) {
	for (i in images) {
		console.log(images[i]);
  }
})*/