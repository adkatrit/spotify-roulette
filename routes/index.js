
/*
 * GET home page.
 */

var redis = require('redis').createClient();

exports.index = function(req, res){
  res.render('index', { title: 'Spotify-Roulette' });
};

exports.rando = function(req, res){

	redis.srandmember('total_rando',function(err,random_song){
		if(!err && random_song != null){

			res.end('http://open.spotify.com/track/'+random_song);
		}else{
			res.end('there as a problem');
		}
	});
}

exports.random = function(req, res){

	redis.srandmember('total_rando',function(err,random_song){
		if(!err && random_song != null){
			res.writeHead(302, {
			  'Location': 'http://open.spotify.com/track/'+random_song
			});
			res.end();
		}else{
			res.end('there was a problem');
		}
	});
}