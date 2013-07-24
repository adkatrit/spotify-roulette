document.getElementById('rando').onclick = function(){
	$.get('/rando',function(url){
		window.open(url);
		// jsPopunder(url, {
		//     name: 'Spotify-Roulette', 
		//     width: 800, 
		//     height: 800
		// });	
	});
}