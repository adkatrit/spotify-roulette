
/**
 * Module dependencies.
 */

  var spotify = require('spotify.js')
  , redis = require('redis').createClient()
  , http = require('http');

var urban_random = 'http://www.urbandictionary.com/random.php';


function get_urb(cb){



 http.get(urban_random, function(res) {

   var spl = res.headers.location.split('=');

   var rand = spl[spl.length-1];

 cb(rand);

 }).on('error', function(e) {
   console.log("Got error: " + e.message);
 });
}
     

process.on('uncaughtException',console.log);

function slurp_artist(name){
  spotify.artists( name, function(err, artists) {
    console.log('Artists results:', artists);
  });

}

function slurp_search(){
  get_urb(function(rand){
  console.log(rand);
  try{
    var timeout = 0;
    var done = false;
    spotify.tracks(rand).forEach(function(track) {
	clearTimeout(timeout);
	timeout=setTimeout(function(){
		done=true;
	},20);

      if (track === null) {
          // finished
      } else {
        if(typeof track.href !='undefined'){
          if(track.album.availability.territories.indexOf('US') != -1){
            redis.sadd(  'total_rando' , track.href.split(':')[2], function(){});  
		if(done){
			slurp_search();
		}
          }
        }
      }
    });
  }catch(e){
   console.log(e);
 }

});
}

slurp_search();
