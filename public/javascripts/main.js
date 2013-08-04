var _gaq = _gaq || [];
function pv(r){ _gaq && _gaq.push('_trackPageview', r)}
function viewport(r){document.getElementById('view-port').src = r;}
function get_random_song(){
  pv('rando_button');
	$.get('/randomkey',function(url){
		pv(url);
		var url = 'https://embed.spotify.com/?uri=spotify:track:'+url;
		viewport(url);
		
	});
}
function get_random_list(){
	pv('rando_list_button');
	$.get('/randomlist',function(list){
		pv(list);
		var url = 'https://embed.spotify.com/?uri=spotify:trackset:Random:'+list;
		viewport(url);
		
	});
}
document.getElementById('rando').onclick = get_random_song;
document.getElementById('randolist').onclick = get_random_list;

