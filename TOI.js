var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
//var port = Number(process.env.PORT || 5000);

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
				
				console.log("-------------------------------------------------------------------------Today's Headlines--------------------------------------------------------------------------------");
				//headline.push({"Headline":$(".top-story > .list8 > li > a[href]").text()});
				//headline = $(".top-story > .list8 > li > a[href]").text();
				//console.log("\r\nHeadline:" +headline);
				//res.writeHead(200, { 'Content-Type': 'text/html' });
				/*for(var i=0;i<1;i++)
				{	
					//res.writeHead(200, { 'Content-Type': 'text/html' });
					//console.log("\r\n");
					//headline.push({"Headline":$(".top-story > .list8 > li ").text()});
					//res.send('<br>');
					//res.send("Headline : "  + "'<br>'" +headline[i].Headline + "'<br>'");
					//headline[i]
					
				}*/
				
					$('.top-story > .list8 ').each(function(i,e)
					{
						res.send("Headlines : <br>  " + $(this).text());
					});
					
			
			/*db.insert(headline,function(err,newGoal)
			{
				if(err)
					console.log(err);
				console.log(newGoal);
			});*/
			
			//res.send("Entries are successfully added");
			}
		})
			
})


app.listen(process.env.PORT || 5000,function(){
	console.log("RUNNING AT 8081..");
})

exports = module.experts = app;