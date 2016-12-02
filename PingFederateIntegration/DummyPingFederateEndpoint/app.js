
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

app.post('/verifyAccess', function (req, res){
	
	var returnValue = {
			scope : "edit",
			token_type : "Bearer",
			client_id : "ac_client",
			expires_in: 1200
	}
	
	console.log ( req.body);
	if (req.body.access_token == "12312" ) {
		
		
	}else {
		
		returnValue.expires_in = 0
		
	}
	res.writeHead( 200,{
	    "Content-Type": "application/json" });
	res.write(JSON.stringify(returnValue))
	res.end();
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
