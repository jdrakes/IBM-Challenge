var photoMap = new Map();
$(document).ready(function() {
    var defer = $.Deferred();
    var apiKey = 'a5e95177da353f58113fd60296e1d250';
    var userId = '24662369@N07';
    var photos = retrieveFlickrPhotos(apiKey, userId, defer);
    
    defer.then(function(photos) {
        if (photos != null) {
            for (p in photos) {
            	processPhoto(apiKey, photos[p]);
            }
            console.log(photoMap);
        }
    });
});

function processPhoto(apiKey, photo) {
    var id = photo.id;
    var deferLarge = $.Deferred();
    var defaultURL = getPhoto(photo);
    hasLargePhoto(apiKey, photo, deferLarge);
    console.log(defaultURL);
    // console.log(large);
    deferLarge.then(function(large) {
    	console.log('here');
        photo.url = defaultURL;
        photo.large = large;
        photoMap.set(id, photo);
    });
    console.log('here2');
}
