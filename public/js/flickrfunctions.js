function retrieveFlickr(apiKey, userId){
	$.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key='+apiKey+'&user_id='+userId+'&format=json&nojsoncallback=1')
	.done(function(photos){
		console.log(photos);
	})
	.error( function(data){
		console.log(data);
		console.log('Error');
	});
}