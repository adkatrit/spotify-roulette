
/*
 * GET home page.
 */

var redis = require('redis').createClient();
var spotify = require('spotify.js');


function get_rando(min,max,cb){
	var randInt = Math.floor(min+Math.random()*max);
	var args = ['summed_total_rando',randInt,randInt/10,'WITHSCORES','LIMIT',0,1];
	redis.zrevrangebyscore(args,function(err,result){
	        cb(result[0],randInt);
	});

}

exports.index = function(req, res){
  res.render('index', { title: 'Spotify Roulette' });
};

exports.rando = function(req, res){
	get_rando(5,21583176426,function(track,num){
			res.end('http://open.spotify.com/track/'+track);
	});
}

exports.random = function(req, res){
	get_rando(5,21583176426,function(url,rando){

	   res.writeHead(302, {
	      'Location': 'http://open.spotify.com/track/'+url
	    });
	   res.end();
	})
}

/*
todo

*/

exports.weighted_random = function(req,res){
	get_rando(5,21583176426,function(url,rando){

	   res.writeHead(302, {
	      'Location': 'http://open.spotify.com/track/'+url
	    });
	   res.end();
	})
	

};

exports.randomkey = function(req,res){
	get_rando(5,21583176426,function(url,rando){
		res.end(url);
	});
}
// exports.stream_mp3 = function(res,req){
// 	res.writeHead(200,
// 			'Content-Type:': 'audio/mpeg',
// 			'Content-Length': unknown.size
// 		)
	
// }
