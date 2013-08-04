
/*
 * GET home page.
 */

var redis = require('redis').createClient();
var spotify = require('spotify.js');


function get_rando(min,max,cb){
	console.log(min,max)
	var randInt = Math.floor(min+Math.random()*max);
	var args = ['summed_total_rando',randInt,randInt/10,'WITHSCORES','LIMIT',0,1];
	redis.zrevrangebyscore(args,function(err,result){
	        cb(result[0],randInt);
	});

}
/*
  callback hell. less Q Q more PEW PEW.

  progressively use min and max random range increase the odds getting popular songs.
*/
function get_rando_lists(min,max,cb){

 get_rando(min,max,function(a,aa){
  get_rando(aa/10,max,function(b,bb){
   get_rando(bb/10,max,function(c,cc){
    get_rando(cc/10,max,function(d,dd){
	 get_rando(dd/10,max,function(e,ee){
	  get_rando(ee/10,max,function(f,ff){
	   get_rando(ff/10,max,function(g,gg){
		get_rando(gg/10,max,function(h,hh){
		 get_rando(hh/10,max,function(i,ii){
		  get_rando(ii/10,max,function(j,jj){
		   get_rando(jj/10,max,function(k,kk){
		    get_rando(kk/10,max,function(l,ll){
	         get_rando(ll/10,max,function(m,mm){
				cb([a,b,c,d,e,f,g,h,i,j,k,l,m].filter(function(itm,i,a){
    				return i==a.indexOf(itm);
				}).join(','));
	         });
	        });
	       });
	      });
	     });
	    });
	   });
	  });
	 });
	});
   });
  });
 });
}
/*
  exploit our callback hell
*/
function get_rando_list(min,max,cb){

	get_rando_lists(min,max,function(a){
	 get_rando_lists(min,max,function(b){
	  get_rando_lists(min,max,function(c){
	   get_rando_lists(min,max,function(d){
		get_rando_lists(min,max,function(e){
		 get_rando_lists(min,max,function(f){

			cb([a,b,c,d,e,f].filter(function(itm,i,a){
    				return i==a.indexOf(itm);
				}).join(','));
	     });
	    });
	   });	
	  });	
	 });
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
exports.randomlist = function(req,res){
	get_rando_list(5,21583176426,function(url){
		res.end(url);
	});

}
// exports.stream_mp3 = function(res,req){
// 	res.writeHead(200,
// 			'Content-Type:': 'audio/mpeg',
// 			'Content-Length': unknown.size
// 		)
	
// }
