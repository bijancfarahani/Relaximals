const express = require('express');
const app = express();
var imageSearch = require("google-image-search-url-results");
app.listen(3000, function() {
  console.log('listening on 3000')
})
app.get('/', function(req,res) {
	res.send("hello world")
})

imageSearch("dogs", function(images) {
	for (i in images) {
		app.get('/', function(req,res) {
			res.send("hello world")
})
	}
});
