
/*
 * GET home page.
 */

var redis = require('redis').createClient();
var spotify = require('spotify.js');
var _ = require('underscore');
exports.randomkey = function(req, res){
	var total = 0;
	redis.zcard('summed_total_rando',function(err,num){
		var randInt = Math.floor(0+Math.random()*num);
		console.log(randInt)
		redis.zrange('summed_total_rando',randInt,randInt,function(err,result){
			res.end(result[0]);
		});
	});
}

function get_rando(min,max,cb){
	console.log(min,max)
	var randInt = Math.floor(min+Math.random()*max);
	var args = ['summed_total_rando',randInt,randInt/10,'WITHSCORES','LIMIT',0,1];
	redis.zrevrangebyscore(args,function(err,result){
	        cb(result[0],randInt);
	});

}
exports.randomlist = function(req,res){
  var results = [];
  (function next(){
    console.log(results);
    if (results.length == 30){
      res.end(results.join(','));
      return;
    }
    get_rando(5,21583176426,function(result,randInt){
      
      redis.sismember(req.cookies['connect.sid'],result,function(err,ismember){
        console.log(ismember);
        if(ismember === 0){
          results.push(result);
          redis.sadd(req.cookies['connect.sid'],result,function(){});
        }
      });
      redis.ttl(req.cookies['connect.sid'],600,function(){});
      results = _.uniq(results);
      next();
    });
  })(0);
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

exports.weighted_random = function(req,res){
	get_rando(5,21583176426,function(url,rando){

	   res.writeHead(302, {
	      'Location': 'http://open.spotify.com/track/'+url
	    });
	   res.end();
	})
	

};
exports.clear = function(req,res){
  if (req.cookies['connect.sid'].indexOf('sorted_rando') == -1) {
    redis.del(req.cookies['connect.sid'],function(err,result){
      res.json(true);
    });
  }else{
    res.json(false);
  }
}
// exports.stream_mp3 = function(res,req){
// 	res.writeHead(200,
// 			'Content-Type:': 'audio/mpeg',
// 			'Content-Length': unknown.size
// 		)
	
// }
