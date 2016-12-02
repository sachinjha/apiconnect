
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.HOST || 'localhost');

// google 

'use strict';

var readline = require('readline');

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '90459887577-q4c1kbbti3npp9splsf7m4l2fcvpblr6.apps.googleusercontent.com';
                
var CLIENT_SECRET = '_3764-ubHmZjWV2aBQuHTOk8';
var REDIRECT_URL = 'https://' + host + '/callback';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// end google 

// all environments


app.set('port', port);
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
//app.get('/users', user.list);

app.get('/callback', handeCallback );

app.get('/sample', function( req, resp){
	resp.writeHead(200, {
	    "Content-Type": "application/json"
	});
	var respJSON = {  "sample": "response"}
	resp.write(JSON.stringify( respJSON) );
	resp.end();
})

function handeCallback( req, resp){
    
    console.log( "reached callback")
    code= req.query.code
    oauth2Client.getToken(code, function (err, tokens) {
        
  // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
          console.log ( tokens)
        oauth2Client.setCredentials(tokens);
           resp.send( tokens )
      }else{
          console.log ( "error in callback")
          console.log( err)
           
      }
    });

   
}

/*
function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'openid profile email https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}*/

/*
// retrieve an access token
getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});
*/


app.get('/token', function(req, resp){
	console.log("reached token method")
	var url = oauth2Client.generateAuthUrl({
    access_type: 'online', // will return a refresh token
    scope: 'openid profile email https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });
    
    resp.redirect( url)

	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
