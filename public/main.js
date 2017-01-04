var dog = document.getElementById('dogButton')
dog.addEventListener('click', function () {
  $.ajax({
    type: 'post',
    url: '/animal',
    dataType: "json",
    data: {animal: "Dog"},
    success: function(res) {
      $('#animalImg').attr('src', res);
    }
  })
})

var cat = document.getElementById('catButton')
cat.addEventListener('click', function () {
  $.ajax({
    type: 'post',
    url: '/animal',
    dataType: "json",
    data: {animal: "Cat"},
    success: function(res) {
      $('#animalImg').attr('src', res);
    }
  })
})
/*var update = document.getElementById('update')
update.addEventListener('click', function () {
	fetch('quotes', {
  		method: 'put',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
    	'name': 'Darth Vader',
    	'quote': 'I find your lack of faith disturbing.'
  		})
	})
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(data => {
		console.log(data)
		window.location.reload(true)
	})
})

var del = document.getElementById('delete');
del.addEventListener('click', function () {
	fetch('quotes', {
    	method: 'delete',
    	headers: {'Content-Type': 'application/json'},
   		body: JSON.stringify({'name': 'Darth Vader'})
  	})
  	.then(res => {
    	if (res.ok) return res.json()
  	})
  	.then(data => {
    	console.log(data)
    	window.location.reload(true)
  	})
})
*/