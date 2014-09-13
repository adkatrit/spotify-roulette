/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var port = (__dirname.indexOf('dev-spotify-roulette')!=-1) ? 3001:3000;
app.configure(function(){
  app.set('port', process.env.PORT || port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/rando', routes.rando);
app.get('/random', routes.random);
app.get('/weighted_random', routes.weighted_random);
app.get('/randomkey',routes.randomkey);
app.get('/randomlist',routes.randomlist);
app.get('/one',routes.one_random_song);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
