var express = require('express'),
	app = express(),
	port = Number(process.env.PORT || 5000);
	
	//var mongo_data = require('');	
	var Datasource = require('nedb');
	
	var db = new Datasource({
		filename: 'headlines.db', // provide a path to the database file 
		autoload: true, // automatically load the database
		timestampData: true // automatically add and manage the fields createdAt and updatedAt
	});

	
	app.get('/', function(req, res) {
		
		var result = [];
		db.find({}).sort({
		updatedAt: -1
	}).exec(function(err,headlines) {
		if (err) res.send(err);
		//res.json(news);
		headlines.foreach(function(d)
		{
			result.push({"Headline":d.Headline});
		});
		res.json(result);
		});
	});

	app.listen(port, function() {
		console.log('Listening on port ' + port);
	});