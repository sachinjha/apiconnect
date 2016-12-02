
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


app.post('/verifyAccess', function ( req, res){
	
	console.log ( req.body);
	if ( req.body.access_token == "1222222222"){
		result = { client_id : "client_ac", scope: "edit"}
		
	}else {
		result = { token : "invalid"}
	}
	res.end(JSON.stringify(result), null, 4);
});



app.options('/log', function( req,res){
	res.writeHead(200, {
	    "Content-Type": "text/plain",
	    "Access-Control-Allow-Origin" : "*",
	    "Access-Control-Allow-Method" : "*"
	    
	});
	res.write("done");
	res.end();
});

app.options('/verifyAccess', function( req,res){
	res.writeHead(200, {
	    "Content-Type": "text/plain",
	    "Access-Control-Allow-Origin" : "*",
	    "Access-Control-Allow-Method" : "*"
	    
	});
	res.write("done");
	res.end();
});


app.post('/log', function ( req, res){
	console.log ( req.body);
	res.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Method" : "*"
    
});
	res.write("done");
	res.end();
	//res.send("done")
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
