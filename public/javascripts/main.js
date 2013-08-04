var _gaq = _gaq || [];
document.getElementById('rando').onclick = function(){
if(typeof _gaq != 'undefined'){
_gaq.push('_trackPageview', 'rando_button');
}
	$.get('/rando',function(url){
		if(typeof _gaq != 'undefined'){
			_gaq.push('_trackPageview', url);
		}
		document.getElementById('view-port').src = url;
	});
}
