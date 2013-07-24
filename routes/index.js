
/*
 * GET home page.
 */

var redis = require('redis').createClient();

exports.index = function(req, res){
  res.render('index', { title: 'Spotify-Roulette' });
};

exports.rando = function(req, res){
	var rando_key = [
	  "nappy",
  "massive",
  "blue",
  "melissa",
  "dark",
  "enigma",
  "swollen",
  "immortal",
  "light",
 "red",
"charlie",
"ibiza",
"gates",
"mushroom",
"funk",
"synth",
"washed",
"bt",
"shadow",
"green",
"field",
"aqua",
 "pdp",
 "slurp",
 "remix"

	];
	var rand_pick = rando_key[ Math.floor(Math.random()*(rando_key.length-1)) ];



	redis.srandmember(rand_pick,function(err,random_song){
		if(!err && random_song != null){

			res.end('http://open.spotify.com/track/'+random_song);
		}else{
			res.end('there as a problem');
		}
	});
}
