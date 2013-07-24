
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , spotify = require('spotify.js')
  , redis = require('redis').createClient();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/rando', routes.rando);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// spotify.artists('swollen members', function(err, artists) {
//     console.log('Artists results:', artists);

//     spotify.albums('bad dreams', function(err, albums) {
//         console.log('Album results:', albums);

        // spotify.tracks('Bad Dreams', function(err, tracks) {
        //     console.log('Track results:', tracks);
        // });
//     });
// });
// Or, stream results as they arrive ...
function slurp_artist(name){
  spotify.artists( name, function(err, artists) {
    console.log('Artists results:', artists);
  });

}
function slurp_search(name){
  spotify.tracks(name).forEach(function(track) {
      if (track === null) {
          // finished
      } else {
        if(typeof track.href !='undefined'){
          redis.sadd(  name , track.href.split(':')[2], console.log);  
        }
        
      }
  });
}



//[
// 'red',
// 'orange',
// 'yellow',
// 'green',
// 'blue',
// 'indigo',
// 'violet',
// 'dark',
// 'light',
// 'remix'
//'funk',
//'twang'
//].forEach(slurp);







