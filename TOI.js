var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = Number(process.env.PORT || 8080);

var Datasource = require('nedb');

//var headlines =  new m({filename:'data.db'});
var db = new Datasource(
{
	filename:'headlines.db',
	autoload:true,
	timestampData:false
}
);
	
app.get('/scrape',function(req,res){


		url = 'http://timesofindia.indiatimes.com/';
		
		request(url,function(error,response,html)
		{
			if(!error)
			{
				var $ = cheerio.load(html);
				var headline = [];
				
				console.log("-----------------------------------------------Today's Headlines------------------------------------------------------");
				//headline.push({"Headline":$(".top-story > .list8 > li > a[href]").text()});
				//headline = $(".top-story > .list8 > li > a[href]").text();
				//console.log("\r\nHeadline:" +headline);
				
				for(var i=0;i<1;i++)
				{
					headline.push({"Headline":$(".top-story > .list8 > li ").text()});
					console.log("Headline : " +headline[i].Headline);
				}
			
			db.insert(headline,function(err,newGoal)
			{
				if(err)
					console.log(err);
				console.log(newGoal);
			});
			
			res.send("Entries are successfully added");
			}
		})
			
})

app.listen(process.env.PORT || 8081,function(){
	console.log("RUNNING AT 8081..");
})

exports = module.experts = app;