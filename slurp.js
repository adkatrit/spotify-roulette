/**
 * Module dependencies.
 */

var spotify = require('spotify.js')
, redis = require('redis').createClient()
, http = require('http');

var urban_random = 'http://www.urbandictionary.com/random.php';

//get a random word from urbandictionary
function get_urb(cb){
  http.get(urban_random, function(res) {
    var spl = res.headers.location.split('=');
    var rand = spl[spl.length-1];
    cb(rand);

  }).on('error', function(e) {
   console.log("Got error: " + e.message);
  });
}

//store a word in the total_rando set
function store_in_set(track){
  if(typeof track.href !='undefined'){
    if(track.album.availability.territories.indexOf('US') != -1){
      redis.sadd(  'total_rando' , track.href.split(':')[2], function(){});  
    }
  }
}
//stream random spotify search results to redis
function slurp_search(){
  get_urb(function(rand){
    try{
      var timeout = 0;
      var done = false;
      spotify.tracks(rand).forEach(function(track) {
        if (track === null) {
            slurp_search();
        } else {
          store_in_set(track);
        }
      });
    }catch(e){
     console.log(e);
    }
  });
}

process.on('uncaughtException',console.log);
slurp_search();
