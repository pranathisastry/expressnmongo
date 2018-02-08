var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 app.use(bodyParser.json()); // support json encoded bodies

// requiring mongoose 

 var mongoose = require('mongoose');
 // requiring mongoose objectId
 var ObjectId = require('mongodb').ObjectId; 
 //dynamic path for local host
 var dbpath = 'mongodb://localhost/BlogApp';

 db = mongoose.connect(dbpath);

 mongoose.connection.once('open', function(){
 	console.log('database connection opened');
 });

// including blog Schema

var Blog = require('./blogSchema.js');
var blogModel = mongoose.model('Blog');

// route to view all  blog items

app.get('/blogs', function(req, res){

	blogModel.find(function(err, result){
		if (err) {
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

// route to view particular blog based on objectId

app.get('/blog/:id', function(req, res){
	var id = req.params.id;
	
	// checking if id is valid

	if (!ObjectId.isValid(id)) {
		res.send("invalid id");
	}

	blogModel.findById(id, function(err, result){
		if (err) {
			res.status(400).send(err);
		}
		else{
			res.send(result);
		}
	});
});

// route to create a blog item

app.post('/create', function(req, res){

	var newBlog = new blogModel();
		newBlog.title = req.body.title;
		newBlog.subTitle = req.body.subTitle;
		newBlog.blogBody = req.body.blogBody;
		var today = Date.now();
		newBlog.createdAt = today;
		var tags = (req.body.tags!=undefined && req.body.tags!=null)?req.body.tags.split(','):'';
		newBlog.tags = tags;
		newBlog.author = req.body.author; 
		newBlog.save(function(error){
			if (error) {
				res.status(400).send(error); 
			}
			else{
				res.send(newBlog); 
			}
		});	
	
});

// route to update/edit a blog item

app.put('/update/:id', function(req, res){

	var updatedData = req.body;
	blogModel.findOneAndUpdate({'_id':req.params.id}, updatedData, function(err, result){
		if (err) {
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});

// route to delete a blog item

app.post('/delete/:id', function(req, res){

	blogModel.remove({'_id':req.params.id}, function(err, result){
		if (err) {
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
	
});





















 app.listen(3000, function(){
 	console.log('Example app listening on port 3000!')
 });